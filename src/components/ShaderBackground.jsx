// src/components/ShaderBackground.jsx

import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  EffectComposer,
  Bloom,
} from "@react-three/postprocessing";

/*
============================================================
VERTEX SHADER
============================================================
*/

const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;

    gl_Position = vec4(
      position,
      1.0
    );
  }
`;

/*
============================================================
FRAGMENT SHADER
============================================================

Features:

- Continuous flowing animation
- Mouse-reactive distortion
- Moving curved arcs
- Glass-like translucent bodies
- Reflective glass edges
- Moving specular highlights
- Neon color transitions
- Soft atmospheric glow
- Dark/light theme adaptation
============================================================
*/

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform vec2 uResolution;
  uniform float uTheme;

  varying vec2 vUv;

  #define PI 3.14159265359


  /*
  ============================================================
  HASH
  ============================================================
  */

  float hash21(vec2 p) {

    p =
      fract(
        p *
        vec2(
          123.34,
          456.21
        )
      );

    p +=
      dot(
        p,
        p + 45.32
      );

    return fract(
      p.x * p.y
    );
  }


  /*
  ============================================================
  ROTATION
  ============================================================
  */

  mat2 rotate(float angle) {

    float c = cos(angle);
    float s = sin(angle);

    return mat2(
      c, -s,
      s,  c
    );
  }


  /*
  ============================================================
  COLOR PALETTE
  ============================================================
  */

  vec3 palette(float t) {

    vec3 cyan =
      vec3(
        0.02,
        0.75,
        1.0
      );

    vec3 blue =
      vec3(
        0.08,
        0.30,
        1.0
      );

    vec3 purple =
      vec3(
        0.55,
        0.08,
        1.0
      );

    vec3 pink =
      vec3(
        1.0,
        0.04,
        0.55
      );

    vec3 orange =
      vec3(
        1.0,
        0.35,
        0.02
      );

    t = fract(t);


    if (t < 0.2) {

      return mix(
        cyan,
        blue,
        smoothstep(
          0.0,
          0.2,
          t
        )
      );

    }


    if (t < 0.4) {

      return mix(
        blue,
        purple,
        smoothstep(
          0.2,
          0.4,
          t
        )
      );

    }


    if (t < 0.6) {

      return mix(
        purple,
        pink,
        smoothstep(
          0.4,
          0.6,
          t
        )
      );

    }


    if (t < 0.8) {

      return mix(
        pink,
        orange,
        smoothstep(
          0.6,
          0.8,
          t
        )
      );

    }


    return mix(
      orange,
      cyan,
      smoothstep(
        0.8,
        1.0,
        t
      )
    );
  }


  /*
  ============================================================
  MAIN SHADER
  ============================================================
  */

  void main() {

    /*
    ==========================================================
    NORMALIZED COORDINATES
    ==========================================================
    */

    vec2 uv =
      gl_FragCoord.xy /
      uResolution.xy;

    float aspect =
      uResolution.x /
      uResolution.y;

    vec2 p =
      uv - 0.5;

    p.x *= aspect;


    /*
    ==========================================================
    MOUSE
    ==========================================================
    */

    vec2 mouse =
      uMouse - 0.5;

    mouse.x *= aspect;

    vec2 mouseVector =
      p - mouse;

    float mouseDistance =
      length(
        mouseVector
      );

    vec2 mouseDirection =
      normalize(
        mouseVector +
        vec2(
          0.0001
        )
      );


    /*
    ==========================================================
    MOUSE INFLUENCE
    ==========================================================
    */

    float mouseInfluence =
      exp(
        -mouseDistance * 1.7
      );


    /*
    ==========================================================
    CONTINUOUS GLOBAL FLOW
    ==========================================================
    */

    float t =
      uTime;

    vec2 flow;


    flow.x =
  sin(
    p.y * 2.4
    +
    t * 0.62
  )
  *
  0.22;


  flow.y =
  cos(
    p.x * 2.0
    -
    t * 0.52
  )
  *
  0.20;


    /*
    Secondary traveling wave
    */

    flow.x +=
  sin(
    p.y * 5.0
    -
    t * 1.0
  )
  *
  0.075;


    flow.y +=
  cos(
    p.x * 4.0
    +
    t * 0.9
  )
  *
  0.075;


    /*
    ==========================================================
    MOUSE SWIRL
    ==========================================================
    */

    vec2 swirl =
      vec2(
        -mouseDirection.y,
        mouseDirection.x
      );


    flow +=
      swirl
      *
      mouseInfluence
      *
      0.65;


    /*
    Mouse push/pull
    */

    flow +=
      mouseDirection
      *
      mouseInfluence
      *
      0.28;


    /*
    Apply flow
    */

    p +=
      flow *
      0.38;


    /*
    ==========================================================
    LARGE SCALE WARP
    ==========================================================
    */

    float warp1 =
      sin(
        p.x * 2.8
        +
        p.y * 2.2
        +
        t * 0.45
      );


    float warp2 =
      cos(
        p.y * 3.2
        -
        p.x * 1.8
        -
        t * 0.38
      );


    p.x +=
      warp1 *
      0.055;


    p.y +=
      warp2 *
      0.055;


    /*
    Mouse increases local distortion
    */

    p +=
      mouseDirection
      *
      mouseInfluence
      *
      0.08;


    /*
    ==========================================================
    MOVING GRID
    ==========================================================
    */

    vec2 grid =
      vec2(
        4.0,
        3.0
      );


    vec2 animatedUV =
      p;


    /*
    Slow global movement
    */

    animatedUV.x +=
      sin(
        t * 0.22
      )
      *
      0.12;


    animatedUV.y +=
      cos(
        t * 0.18
      )
      *
      0.10;


    /*
    Mouse shifts the field
    */

    animatedUV +=
      mouse
      *
      0.18;


    vec2 cellPosition =
      floor(
        (animatedUV + 0.5)
        *
        grid
      );


    vec2 local =
      fract(
        (animatedUV + 0.5)
        *
        grid
      )
      -
      0.5;


    /*
    ==========================================================
    CELL RANDOMNESS
    ==========================================================
    */

    float random1 =
      hash21(
        cellPosition
      );


    float random2 =
      hash21(
        cellPosition
        +
        17.31
      );


    float random3 =
      hash21(
        cellPosition
        +
        41.73
      );


    /*
    ==========================================================
    CELL ROTATION
    ==========================================================
    */

    float cellRotation =
      (random1 - 0.5)
      *
      PI;


    cellRotation +=
      sin(
        t *
        (
          0.28
          +
          random2 *
          0.25
        )
        +
        random1 *
        6.283
      )
      *
      0.7;


    local =
      rotate(
        cellRotation
      )
      *
      local;


    /*
    ==========================================================
    PRIMARY GLASS ARC
    ==========================================================
    */

    float radius =
      0.25
      +
      random2 *
      0.22;


    /*
    Breathing glass
    */

    radius +=
      sin(
        t * 0.55
        +
        random3 *
        6.28
      )
      *
      0.055;


    float radialDistance =
      length(
        local
      );


    float distanceFromRing =
      radialDistance
      -
      radius;


    /*
    ==========================================================
    NEON ARC
    ==========================================================
    */

    float arc =
      exp(
        -abs(
          distanceFromRing
        )
        *
        75.0
      );


    /*
    ==========================================================
    SOFT NEON GLOW
    ==========================================================
    */

    float glow =
      exp(
        -abs(
          distanceFromRing
        )
        *
        18.0
      );


    /*
    ==========================================================
    ARC ANGLE
    ==========================================================
    */

    float angle =
      atan(
        local.y,
        local.x
      );


    /*
    ==========================================================
    MOVING ARC SEGMENT
    ==========================================================
    */

    float travelingAngle =
      angle
      -
      t *
      (
        0.35
        +
        random2 *
        0.35
      );


    float fragment =
      smoothstep(
        -0.15,
        0.15,
        sin(
          travelingAngle *
          2.0
          +
          random1 *
          8.0
        )
      );


    float fragment2 =
      smoothstep(
        -0.25,
        0.20,
        cos(
          travelingAngle *
          3.0
          -
          t * 0.55
        )
      );


    fragment *=
      fragment2;


    /*
    ==========================================================
    SECONDARY ARC
    ==========================================================
    */

    float radius2 =
      0.48
      +
      sin(
        t * 0.32
        +
        random1 * 4.0
      )
      *
      0.07;


    float ring2 =
      exp(
        -abs(
          radialDistance
          -
          radius2
        )
        *
        60.0
      );


    float ring2Mask =
      smoothstep(
        -0.1,
        0.3,
        sin(
          angle *
          2.5
          +
          t * 0.45
          +
          random3 * 5.0
        )
      );


    /*
    ==========================================================
    GLASS BODY
    ==========================================================
    */

    float glassBody =
      exp(
        -abs(
          distanceFromRing
        )
        *
        5.5
      );


    /*
    Subtle translucent body
    */

    glassBody *=
      0.16;


    /*
    ==========================================================
    GLASS REFLECTIVE EDGE
    ==========================================================
    */

    float glassEdge =
      exp(
        -abs(
          distanceFromRing
        )
        *
        24.0
      );


    /*
    ==========================================================
    SPECULAR HIGHLIGHT
    ==========================================================
    */

    float specularPosition =
      sin(
        t * 0.8
        +
        random1 * 8.0
      );


    float specular =
      pow(
        max(
          0.0,
          cos(
            angle
            +
            specularPosition
          )
        ),
        18.0
      );


    /*
    ==========================================================
    COMBINE NEON
    ==========================================================
    */

    float intensity =
      arc *
      fragment;


    intensity +=
      ring2 *
      ring2Mask
      *
      0.55;


    intensity +=
      glow *
      0.06;


    /*
    ==========================================================
    COLOR
    ==========================================================
    */

    float colorPosition =
      random1
      +
      t * 0.055
      +
      angle * 0.08;


    /*
    Cursor changes color slightly
    */

    colorPosition +=
      mouseInfluence *
      0.12;


    vec3 color =
      palette(
        colorPosition
      );


    vec3 secondaryColor =
      palette(
        colorPosition
        +
        0.12
      );


    color =
      mix(
        color,
        secondaryColor,
        0.20
      );


    /*
    ==========================================================
    GLASS COLOR
    ==========================================================
    */

    vec3 glassBase =
      mix(
        vec3(
          0.012,
          0.016,
          0.028
        ),

        color,

        0.22
      );


    /*
    ==========================================================
    REFLECTIVE COLOR
    ==========================================================
    */

    vec3 reflectionColor =
      mix(
        vec3(
          0.65,
          0.75,
          1.0
        ),

        color,

        0.65
      );


    /*
    ==========================================================
    GLASS LAYER
    ==========================================================
    */

    vec3 glassLayer =
      glassBase
      *
      glassBody;


    /*
    Reflective rim
    */

    glassLayer +=
      reflectionColor
      *
      glassEdge
      *
      0.18;


    /*
    White specular highlight
    */

    glassLayer +=
      vec3(
        1.0,
        1.0,
        1.0
      )
      *
      specular
      *
      0.12;


    /*
    ==========================================================
    MOUSE REFLECTION
    ==========================================================
    */

    float mouseReflection =
      exp(
        -mouseDistance *
        4.0
      );


    glassLayer +=
      reflectionColor
      *
      mouseReflection
      *
      0.18;


    /*
    ==========================================================
    CURSOR GLOW
    ==========================================================
    */

    float cursorGlow =
      exp(
        -mouseDistance *
        2.8
      );


    color +=
      palette(
        t * 0.08
        +
        mouseDistance
      )
      *
      cursorGlow
      *
      0.28;


    /*
    ==========================================================
    VIGNETTE
    ==========================================================
    */

    float vignette =
      smoothstep(
        1.45,
        0.20,
        length(
          p /
          vec2(
            aspect,
            1.0
          )
        )
      );


    /*
    ==========================================================
    THEME
    ==========================================================

    uTheme:

    0 = dark
    1 = light
    ==========================================================
    */

    float brightness =
      mix(
        1.25,
        0.55,
        uTheme
      );


    float opacity =
      mix(
        0.72,
        0.18,
        uTheme
      );


    float glassOpacity =
      mix(
        1.0,
        0.42,
        uTheme
      );


    /*
    Light mode gets softer contrast.
    */

    intensity *=
      mix(
        1.0,
        0.72,
        uTheme
      );


    /*
    ==========================================================
    FINAL NEON
    ==========================================================
    */

    vec3 neonLayer =
      color
      *
      intensity
      *
      brightness;


    /*
    ==========================================================
    FINAL GLASS + NEON
    ==========================================================
    */

    vec3 finalColor =
      glassLayer
      +
      neonLayer;


    finalColor *=
      glassOpacity;


    /*
    ==========================================================
    FINAL ALPHA
    ==========================================================
    */

    float alpha =
      (
        intensity
        +
        glassBody *
        0.45
        +
        glassEdge *
        0.08
        +
        specular *
        0.05
      )
      *
      opacity
      *
      vignette;


    alpha =
      clamp(
        alpha,
        0.0,
        0.85
      );


    gl_FragColor =
      vec4(
        finalColor,
        alpha
      );
  }
`;


/*
============================================================
PARSE CSS COLOR
============================================================
*/

function parseColor(value) {

  if (!value) {
    return null;
  }

  const temp =
    document.createElement(
      "div"
    );

  temp.style.color =
    value;

  document.body.appendChild(
    temp
  );

  const computed =
    getComputedStyle(
      temp
    ).color;

  temp.remove();

  const numbers =
    computed.match(
      /\d+/g
    );

  if (
    !numbers ||
    numbers.length < 3
  ) {
    return null;
  }

  return {
    r: Number(
      numbers[0]
    ),

    g: Number(
      numbers[1]
    ),

    b: Number(
      numbers[2]
    ),
  };
}


/*
============================================================
DETECT THEME
============================================================
*/

function detectTheme() {

  const root =
    document.documentElement;


  /*
  Explicit dark mode
  */

  if (
    root.classList.contains(
      "dark"
    )
  ) {
    return 0;
  }


  /*
  Explicit light mode
  */

  if (
    root.classList.contains(
      "light"
    )
  ) {
    return 1;
  }


  /*
  CSS variable fallback
  */

  const styles =
    getComputedStyle(
      root
    );


  const background =
    styles
      .getPropertyValue(
        "--background"
      )
      .trim();


  const surface =
    styles
      .getPropertyValue(
        "--surface"
      )
      .trim();


  const color =
    parseColor(
      background ||
      surface
    );


  if (color) {

    const luminance =
      (
        color.r * 0.299 +
        color.g * 0.587 +
        color.b * 0.114
      )
      /
      255;


    return luminance >
      0.5
      ? 1
      : 0;
  }


  /*
  Default to dark.
  */

  return 0;
}


/*
============================================================
SHADER MESH
============================================================
*/

function ShaderMesh() {

  const mouseTarget =
    useRef(
      new THREE.Vector2(
        0.5,
        0.5
      )
    );


  const uniformsRef =
    useRef({

      uTime: {
        value: 0,
      },

      uMouse: {
        value:
          new THREE.Vector2(
            0.5,
            0.5
          ),
      },

      uResolution: {
        value:
          new THREE.Vector2(
            1,
            1
          ),
      },

      uTheme: {
        value:
          detectTheme(),
      },
    });


  /*
  ==========================================================
  MOUSE TRACKING
  ==========================================================
  */

  useEffect(() => {

    const handlePointerMove =
      (event) => {

        mouseTarget.current.x =
          event.clientX /
          window.innerWidth;


        mouseTarget.current.y =
          1 -
          event.clientY /
          window.innerHeight;
      };


    window.addEventListener(
      "pointermove",
      handlePointerMove,
      {
        passive: true,
      }
    );


    return () => {

      window.removeEventListener(
        "pointermove",
        handlePointerMove
      );

    };

  }, []);


  /*
  ==========================================================
  THEME TRACKING
  ==========================================================
  */

  useEffect(() => {

    const updateTheme =
      () => {

        uniformsRef.current
          .uTheme
          .value =
          detectTheme();
      };


    updateTheme();


    const observer =
      new MutationObserver(
        updateTheme
      );


    observer.observe(
      document.documentElement,
      {
        attributes: true,

        attributeFilter: [
          "class",
          "style",
          "data-theme",
        ],
      }
    );


    return () => {

      observer.disconnect();

    };

  }, []);


  /*
  ==========================================================
  ANIMATION LOOP
  ==========================================================
  */

  useFrame(
    (state) => {

      const {
        clock,
        size,
        gl,
      } = state;


      /*
      Continuous time
      */

      uniformsRef.current
        .uTime
        .value =
        clock.getElapsedTime();


      /*
      Resolution
      */

      const pixelRatio =
        gl.getPixelRatio();


      uniformsRef.current
        .uResolution
        .value.set(
          size.width *
          pixelRatio,

          size.height *
          pixelRatio
        );


      /*
      Smooth cursor
      */

      uniformsRef.current
        .uMouse
        .value.x +=
        (
          mouseTarget
            .current
            .x
          -
          uniformsRef.current
            .uMouse
            .value.x
        )
        *
        0.06;


      uniformsRef.current
        .uMouse
        .value.y +=
        (
          mouseTarget
            .current
            .y
          -
          uniformsRef.current
            .uMouse
            .value.y
        )
        *
        0.06;

    }
  );


  /*
  ==========================================================
  FULLSCREEN SHADER
  ==========================================================
  */

  return (
    <mesh>

      <planeGeometry
        args={[
          2,
          2,
        ]}
      />

      <shaderMaterial
        vertexShader={
          vertexShader
        }

        fragmentShader={
          fragmentShader
        }

        uniforms={
          uniformsRef.current
        }

        transparent

        depthWrite={
          false
        }

        depthTest={
          false
        }
      />

    </mesh>
  );
}


/*
============================================================
MAIN BACKGROUND
============================================================
*/

export default function ShaderBackground() {

  return (
    <div
      className="
        pointer-events-none
        absolute
        inset-0
        z-0
        h-full
        w-full
        overflow-hidden
      "
      aria-hidden="true"
    >

      <Canvas
        dpr={[
          1,
          1.5,
        ]}

        orthographic

        camera={{
          position: [
            0,
            0,
            1,
          ],

          zoom: 1,
        }}

        gl={{
          alpha: true,

          antialias: true,

          powerPreference:
            "high-performance",
        }}
      >

        <ShaderMesh />

        <EffectComposer
          multisampling={0}
        >

          <Bloom
            intensity={1.35}

            luminanceThreshold={
              0.18
            }

            luminanceSmoothing={
              0.65
            }

            mipmapBlur
          />

        </EffectComposer>

      </Canvas>

    </div>
  );
}