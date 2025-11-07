"use client";

import { useState } from "react";
import { HiX, HiPencil, HiCheck, HiClock, HiCalendar, HiLocationMarker, HiUserGroup } from "react-icons/hi";

export function EventsModal({ events = [], isOpen, onClose }) {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedEvent, setEditedEvent] = useState(null);

  const handleViewDetails = (event) => {
    setSelectedEvent(event);
    setEditedEvent({ ...event });
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedEvent({ ...selectedEvent });
    }
  };

  const handleInputChange = (field, value) => {
    setEditedEvent({ ...editedEvent, [field]: value });
  };

  const handleSave = () => {
    setSelectedEvent(editedEvent);
    setIsEditing(false);
    console.log("Saved event:", editedEvent);
  };

  const handleCloseDetail = () => {
    setSelectedEvent(null);
    setIsEditing(false);
  };

  const handleMainClose = () => {
    setSelectedEvent(null);
    setIsEditing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 bg-opacity-50 dark:bg-opacity-70">
        <div className="relative max-h-full w-full max-w-4xl p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                All Events
              </h3>
              <button
                type="button"
                onClick={handleMainClose}
                className="ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <HiX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4 p-6">
              {events.length === 0 ? (
                <div className="text-center py-8">
                  <HiUserGroup className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-500 dark:text-gray-400">No events found</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {events.map((event, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {event.title}
                          </h4>
                          <div className="space-y-1.5">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <HiUserGroup className="mr-2 h-4 w-4 text-amber-300" />
                              <span>{event.organizerCompany || "Not specified"}</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <HiCalendar className="mr-2 h-4 w-4 text-amber-300" />
                              <span>{event.date}</span>
                              <HiClock className="ml-4 mr-2 h-4 w-4 text-amber-300" />
                              <span>{event.time} ({event.duration})</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <HiLocationMarker className="mr-2 h-4 w-4 text-amber-300" />
                              <span>{event.location || "Not specified"}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                {event.eventType}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewDetails(event)}
                          className="ml-4 rounded-lg bg-amber-300 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {selectedEvent && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40  bg-opacity-60 dark:bg-opacity-80">
          <div className="relative max-h-full w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow-xl dark:bg-gray-800">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isEditing ? "Edit Event" : "Event Details"}
                </h3>
                <div className="flex items-center space-x-2">
                  {!isEditing ? (
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="inline-flex items-center rounded-lg bg-amber-300 px-3 py-1.5 text-sm font-medium text-gray-900 hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-300"
                    >
                      <HiPencil className="mr-1 h-4 w-4" />
                      Edit
                    </button>
                  ) : (
                    <>
                      <button
                        type="button"
                        onClick={handleSave}
                        className="inline-flex items-center rounded-lg bg-green-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-4 focus:ring-green-300"
                      >
                        <HiCheck className="mr-1 h-4 w-4" />
                        Save
                      </button>
                      <button
                        type="button"
                        onClick={handleEditToggle}
                        className="inline-flex items-center rounded-lg bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      >
                        Cancel
                      </button>
                    </>
                  )}
                  <button
                    type="button"
                    onClick={handleCloseDetail}
                    className="ml-2 inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <HiX className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="space-y-6 p-6">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Event Title
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedEvent.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    />
                  ) : (
                    <p className="text-base text-gray-900 dark:text-white">{selectedEvent.title}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Organizer / Company Name
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedEvent.organizerCompany || ""}
                      onChange={(e) => handleInputChange("organizerCompany", e.target.value)}
                      placeholder="Organizer or company name"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white flex items-center">
                      <HiUserGroup className="mr-2 h-4 w-4 text-amber-300" />
                      {selectedEvent.organizerCompany || "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Description / Notes
                  </label>
                  {isEditing ? (
                    <textarea
                      rows="4"
                      value={editedEvent.description || ""}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedEvent.description || "No description provided"}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Date
                    </label>
                    {isEditing ? (
                      <input
                        type="date"
                        value={editedEvent.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 dark:text-white flex items-center">
                        <HiCalendar className="mr-2 h-4 w-4 text-amber-300" />
                        {selectedEvent.date}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Time
                    </label>
                    {isEditing ? (
                      <input
                        type="time"
                        value={editedEvent.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 dark:text-white flex items-center">
                        <HiClock className="mr-2 h-4 w-4 text-amber-300" />
                        {selectedEvent.time}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Duration
                    </label>
                    {isEditing ? (
                      <input
                        type="text"
                        value={editedEvent.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        placeholder="e.g., 2 hours"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 dark:text-white">{selectedEvent.duration}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Event Type
                    </label>
                    {isEditing ? (
                      <select
                        value={editedEvent.eventType}
                        onChange={(e) => handleInputChange("eventType", e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      >
                        <option value="Conference">Conference</option>
                        <option value="Seminar">Seminar</option>
                        <option value="Workshop">Workshop</option>
                        <option value="Webinar">Webinar</option>
                        <option value="Networking">Networking</option>
                        <option value="Trade Show">Trade Show</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <span className="inline-block rounded bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                        {selectedEvent.eventType}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Location
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedEvent.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Event location or link"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white flex items-center">
                      <HiLocationMarker className="mr-2 h-4 w-4 text-amber-300" />
                      {selectedEvent.location || "Not specified"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function EventsExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const sampleEvents = [
    {
      title: "Annual Tech Conference 2025",
      organizerCompany: "Tech Summit Inc.",
      description: "Join industry leaders for discussions on emerging technologies, AI trends, and digital transformation strategies.",
      date: "2025-11-20",
      time: "09:00",
      duration: "2 days",
      eventType: "Conference",
      location: "Convention Center, New York"
    },
    {
      title: "React Advanced Patterns Workshop",
      organizerCompany: "Dev Academy",
      description: "Learn advanced React patterns including hooks, context, and performance optimization techniques.",
      date: "2025-11-25",
      time: "10:00",
      duration: "4 hours",
      eventType: "Workshop",
      location: "Online - Zoom"
    },
    {
      title: "Web Development Seminar",
      organizerCompany: "Code Masters",
      description: "Comprehensive seminar covering latest web development practices and tools for 2025.",
      date: "2025-11-18",
      time: "14:00",
      duration: "3 hours",
      eventType: "Seminar",
      location: "Tech Hub, Bangalore"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-lg bg-amber-300 px-6 py-3 text-base font-medium text-gray-900 hover:bg-amber-400 focus:outline-none focus:ring-4 focus:ring-amber-300 dark:focus:ring-amber-800"
      >
        View All Events
      </button>
      
      <EventsModal 
        events={sampleEvents}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}
