import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Check,
  Clock3,
  Eye,
  Inbox,
  LogOut,
  Mail,
  RefreshCw,
  Search,
  Trash2,
  X,
} from "lucide-react";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const STATUS_OPTIONS = [
  "all",
  "new",
  "read",
  "replied",
  "archived",
];

function AdminDashboard({ token, onLogout }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] =
    useState(null);

  const [statusFilter, setStatusFilter] =
    useState("all");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] =
    useState(false);

  const [actionId, setActionId] = useState(null);
  const [error, setError] = useState("");

  const logout = () => {
    localStorage.removeItem("adminToken");
    onLogout();
  };

  const authHeaders = {
    Authorization: `Bearer ${token}`,
  };

  const fetchContacts = async (
    showRefresh = false
  ) => {
    if (showRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    try {
      const response = await fetch(
        `${API_URL}/admin/contacts`,
        {
          headers: authHeaders,
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to load messages"
        );
      }

      setContacts(result.data || []);
    } catch (error) {
      setError(
        error.message ||
          "Unable to load messages"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const updateStatus = async (
    contact,
    status
  ) => {
    if (!contact?._id) return;

    setActionId(contact._id);

    try {
      const response = await fetch(
        `${API_URL}/admin/contacts/${contact._id}/status`,
        {
          method: "PATCH",
          headers: {
            ...authHeaders,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to update status"
        );
      }

      setContacts((current) =>
        current.map((item) =>
          item._id === contact._id
            ? {
                ...item,
                status,
              }
            : item
        )
      );

      setSelectedContact((current) =>
        current?._id === contact._id
          ? {
              ...current,
              status,
            }
          : current
      );
    } catch (error) {
      setError(
        error.message ||
          "Unable to update status"
      );
    } finally {
      setActionId(null);
    }
  };

  const deleteContact = async (contact) => {
    if (!contact?._id) return;

    const confirmed = window.confirm(
      `Delete the message from ${contact.name}?`
    );

    if (!confirmed) return;

    setActionId(contact._id);

    try {
      const response = await fetch(
        `${API_URL}/admin/contacts/${contact._id}`,
        {
          method: "DELETE",
          headers: authHeaders,
        }
      );

      const result = await response.json();

      if (response.status === 401) {
        logout();
        return;
      }

      if (!response.ok || !result.success) {
        throw new Error(
          result.message ||
            "Unable to delete message"
        );
      }

      setContacts((current) =>
        current.filter(
          (item) => item._id !== contact._id
        )
      );

      setSelectedContact(null);
    } catch (error) {
      setError(
        error.message ||
          "Unable to delete message"
      );
    } finally {
      setActionId(null);
    }
  };

  const filteredContacts = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    return contacts.filter((contact) => {
      const matchesStatus =
        statusFilter === "all" ||
        contact.status === statusFilter;

      const matchesSearch =
        !query ||
        contact.name
          ?.toLowerCase()
          .includes(query) ||
        contact.email
          ?.toLowerCase()
          .includes(query) ||
        contact.subject
          ?.toLowerCase()
          .includes(query) ||
        contact.message
          ?.toLowerCase()
          .includes(query);

      return matchesStatus && matchesSearch;
    });
  }, [
    contacts,
    statusFilter,
    search,
  ]);

  const stats = useMemo(() => {
    return {
      total: contacts.length,

      new: contacts.filter(
        (item) => item.status === "new"
      ).length,

      read: contacts.filter(
        (item) => item.status === "read"
      ).length,

      replied: contacts.filter(
        (item) => item.status === "replied"
      ).length,

      archived: contacts.filter(
        (item) => item.status === "archived"
      ).length,
    };
  }, [contacts]);

  const formatDate = (date) => {
    if (!date) return "Unknown date";

    return new Intl.DateTimeFormat(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }
    ).format(new Date(date));
  };

  const formatRelativeDate = (date) => {
    if (!date) return "";

    const diff =
      Date.now() -
      new Date(date).getTime();

    const minutes = Math.floor(
      diff / 60000
    );

    if (minutes < 1) return "Just now";
    if (minutes < 60)
      return `${minutes}m ago`;

    const hours = Math.floor(
      minutes / 60
    );

    if (hours < 24)
      return `${hours}h ago`;

    const days = Math.floor(
      hours / 24
    );

    if (days < 7)
      return `${days}d ago`;

    return formatDate(date);
  };

  return (
    <main className="admin-dashboard">
      {/* BACKGROUND */}
      <div className="admin-dashboard-glow admin-glow-one" />
      <div className="admin-dashboard-glow admin-glow-two" />

      {/* TOP BAR */}
      <header className="admin-topbar">
        <div className="admin-topbar-brand">
          <a href="#home">
            <ArrowLeft size={15} />
            <span>Portfolio</span>
          </a>

          <div className="admin-divider" />

          <span className="admin-section-label">
            ADMIN
          </span>
        </div>

        <div className="admin-topbar-actions">
          <button
            onClick={() =>
              fetchContacts(true)
            }
            className="admin-icon-button"
            title="Refresh"
            disabled={refreshing}
          >
            <RefreshCw
              size={16}
              className={
                refreshing
                  ? "admin-spin"
                  : ""
              }
            />
          </button>

          <button
            onClick={logout}
            className="admin-logout"
          >
            <LogOut size={15} />
            <span>Logout</span>
          </button>
        </div>
      </header>

      <div className="admin-container">
        {/* HEADER */}
        <motion.section
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="admin-heading"
        >
          <div>
            <span className="admin-eyebrow">
              PRIVATE / DASHBOARD
            </span>

            <h1>
              Message
              <span> center.</span>
            </h1>

            <p>
              Everything people send through
              your portfolio, in one place.
            </p>
          </div>

          <div className="admin-live-status">
            <span />
            SYSTEM ONLINE
          </div>
        </motion.section>

        {/* ERROR */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="admin-alert"
            >
              <span>{error}</span>

              <button
                onClick={() =>
                  setError("")
                }
              >
                <X size={15} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* STATS */}
        <section className="admin-stats">
          <StatCard
            icon={<Inbox size={18} />}
            label="Total"
            value={stats.total}
            accent="violet"
          />

          <StatCard
            icon={<Mail size={18} />}
            label="New"
            value={stats.new}
            accent="cyan"
          />

          <StatCard
            icon={<Eye size={18} />}
            label="Read"
            value={stats.read}
            accent="blue"
          />

          <StatCard
            icon={<Check size={18} />}
            label="Replied"
            value={stats.replied}
            accent="green"
          />
        </section>

        {/* TOOLBAR */}
        <section className="admin-toolbar">
          <div className="admin-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="Search messages..."
              value={search}
              onChange={(event) =>
                setSearch(
                  event.target.value
                )
              }
            />
          </div>

          <div className="admin-filters">
            {STATUS_OPTIONS.map(
              (status) => (
                <button
                  key={status}
                  className={
                    statusFilter === status
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setStatusFilter(
                      status
                    )
                  }
                >
                  {status}
                </button>
              )
            )}
          </div>
        </section>

        {/* MESSAGES */}
        <section className="admin-message-section">
          <div className="admin-section-header">
            <div>
              <span>
                CONTACT ARCHIVE
              </span>

              <strong>
                {filteredContacts.length}
                {" "}
                messages
              </strong>
            </div>

            <span>
              Sorted newest first
            </span>
          </div>

          {loading ? (
            <div className="admin-loading">
              <div className="admin-loader" />
              <span>
                Loading messages...
              </span>
            </div>
          ) : filteredContacts.length ===
            0 ? (
            <EmptyState
              hasFilters={
                search.length > 0 ||
                statusFilter !== "all"
              }
              onReset={() => {
                setSearch("");
                setStatusFilter("all");
              }}
            />
          ) : (
            <div className="admin-message-list">
              {filteredContacts.map(
                (contact, index) => (
                  <MessageCard
                    key={contact._id}
                    contact={contact}
                    index={index}
                    onOpen={() =>
                      setSelectedContact(
                        contact
                      )
                    }
                    onStatusChange={
                      updateStatus
                    }
                    onDelete={
                      deleteContact
                    }
                    actionId={actionId}
                    formatRelativeDate={
                      formatRelativeDate
                    }
                  />
                )
              )}
            </div>
          )}
        </section>
      </div>

      {/* MESSAGE DETAIL */}
      <AnimatePresence>
        {selectedContact && (
          <MessageModal
            contact={selectedContact}
            onClose={() =>
              setSelectedContact(null)
            }
            onStatusChange={
              updateStatus
            }
            onDelete={deleteContact}
            actionId={actionId}
            formatDate={formatDate}
          />
        )}
      </AnimatePresence>
    </main>
  );
}

function StatCard({
  icon,
  label,
  value,
  accent,
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className={`admin-stat-card admin-stat-${accent}`}
    >
      <div className="admin-stat-icon">
        {icon}
      </div>

      <div>
        <span>{label}</span>
        <strong>{value}</strong>
      </div>
    </motion.div>
  );
}

function MessageCard({
  contact,
  index,
  onOpen,
  onStatusChange,
  onDelete,
  actionId,
  formatRelativeDate,
}) {
  const status =
    contact.status || "new";

  return (
    <motion.article
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.04,
      }}
      whileHover={{
        y: -2,
      }}
      className={`admin-message-card status-${status}`}
    >
      <button
        className="admin-message-main"
        onClick={onOpen}
      >
        <div className="admin-message-avatar">
          {contact.name
            ?.charAt(0)
            .toUpperCase() || "?"}
        </div>

        <div className="admin-message-info">
          <div className="admin-message-title">
            <strong>
              {contact.name}
            </strong>

            <StatusBadge
              status={status}
            />
          </div>

          <span className="admin-message-email">
            {contact.email}
          </span>

          <h3>
            {contact.subject ||
              "No subject"}
          </h3>

          <p>
            {contact.message}
          </p>
        </div>
      </button>

      <div className="admin-message-meta">
        <time>
          {formatRelativeDate(
            contact.createdAt
          )}
        </time>

        <div className="admin-message-actions">
          {status !== "read" && (
            <button
              title="Mark as read"
              disabled={
                actionId === contact._id
              }
              onClick={() =>
                onStatusChange(
                  contact,
                  "read"
                )
              }
            >
              <Eye size={14} />
            </button>
          )}

          {status !== "replied" && (
            <button
              title="Mark as replied"
              disabled={
                actionId === contact._id
              }
              onClick={() =>
                onStatusChange(
                  contact,
                  "replied"
                )
              }
            >
              <Check size={14} />
            </button>
          )}

          <button
            title="Delete"
            className="danger"
            disabled={
              actionId === contact._id
            }
            onClick={() =>
              onDelete(contact)
            }
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`admin-status-badge status-${status}`}
    >
      <span />
      {status}
    </span>
  );
}

function EmptyState({
  hasFilters,
  onReset,
}) {
  return (
    <div className="admin-empty">
      <div>
        <Inbox size={24} />
      </div>

      <h3>
        {hasFilters
          ? "Nothing matches."
          : "No messages yet."}
      </h3>

      <p>
        {hasFilters
          ? "Try changing your search or status filter."
          : "When someone uses the contact form, their message will appear here."}
      </p>

      {hasFilters && (
        <button onClick={onReset}>
          Clear filters
        </button>
      )}
    </div>
  );
}

function MessageModal({
  contact,
  onClose,
  onStatusChange,
  onDelete,
  actionId,
  formatDate,
}) {
  const status =
    contact.status || "new";

  return (
    <motion.div
      className="admin-modal-backdrop"
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
      onClick={onClose}
    >
      <motion.div
        className="admin-modal"
        initial={{
          opacity: 0,
          y: 30,
          scale: 0.97,
        }}
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
        }}
        exit={{
          opacity: 0,
          y: 20,
          scale: 0.98,
        }}
        onClick={(event) =>
          event.stopPropagation()
        }
      >
        <div className="admin-modal-header">
          <div>
            <span>MESSAGE / DETAIL</span>
            <h2>
              {contact.subject ||
                "No subject"}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="admin-close"
          >
            <X size={18} />
          </button>
        </div>

        <div className="admin-modal-person">
          <div className="admin-message-avatar">
            {contact.name
              ?.charAt(0)
              .toUpperCase() || "?"}
          </div>

          <div>
            <strong>
              {contact.name}
            </strong>

            <a
              href={`mailto:${contact.email}`}
            >
              {contact.email}
            </a>
          </div>
        </div>

        <div className="admin-modal-date">
          <Clock3 size={14} />
          {formatDate(contact.createdAt)}
        </div>

        <div className="admin-modal-message">
          {contact.message}
        </div>

        <div className="admin-modal-footer">
          <div className="admin-modal-status">
            <span>STATUS</span>

            <select
              value={status}
              disabled={
                actionId === contact._id
              }
              onChange={(event) =>
                onStatusChange(
                  contact,
                  event.target.value
                )
              }
            >
              {STATUS_OPTIONS.filter(
                (item) => item !== "all"
              ).map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          <div className="admin-modal-actions">
            <a
              href={`mailto:${contact.email}?subject=Re: ${
                contact.subject ||
                "Your message"
              }`}
              className="admin-reply"
            >
              <Mail size={15} />
              Reply
            </a>

            <button
              className="admin-delete-button"
              disabled={
                actionId === contact._id
              }
              onClick={() =>
                onDelete(contact)
              }
            >
              <Trash2 size={15} />
              Delete
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default AdminDashboard;