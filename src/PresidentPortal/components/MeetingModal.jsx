import { useState } from "react";
import { HiOutlineExclamationCircle, HiX, HiPencil, HiCheck, HiClock, HiCalendar, HiLocationMarker } from "react-icons/hi";

export function MeetingsModal({ meetings = [], isOpen, onClose }) {
  const [selectedMeeting, setSelectedMeeting] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedMeeting, setEditedMeeting] = useState(null);

  const handleViewDetails = (meeting) => {
    setSelectedMeeting(meeting);
    setEditedMeeting({ ...meeting });
    setIsEditing(false);
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditedMeeting({ ...selectedMeeting });
    }
  };

  const handleInputChange = (field, value) => {
    setEditedMeeting({ ...editedMeeting, [field]: value });
  };

  const handleSave = () => {
    setSelectedMeeting(editedMeeting);
    setIsEditing(false);
    console.log("Saved meeting:", editedMeeting);
  };

  const handleCloseDetail = () => {
    setSelectedMeeting(null);
    setIsEditing(false);
  };

  const handleMainClose = () => {
    setSelectedMeeting(null);
    setIsEditing(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center bg-black/30 justify-center overflow-y-auto overflow-x-hidden bg-opacity-50 dark:bg-opacity-70">
        <div className="relative max-h-full w-full max-w-4xl p-4">
          <div className="relative rounded-lg bg-white shadow dark:bg-gray-800">
            <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                All Meetings
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
              {meetings.length === 0 ? (
                <div className="text-center py-8">
                  <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-500" />
                  <p className="text-gray-500 dark:text-gray-400">No meetings found</p>
                </div>
              ) : (
                <div className="max-h-96 overflow-y-auto space-y-3">
                  {meetings.map((meeting, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md dark:border-gray-700 dark:bg-gray-700"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                            {meeting.title}
                          </h4>
                          <div className="space-y-1.5">
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <HiCalendar className="mr-2 h-4 w-4 text-amber-300" />
                              <span>{meeting.date}</span>
                              <HiClock className="ml-4 mr-2 h-4 w-4 text-amber-300" />
                              <span>{meeting.time} ({meeting.duration})</span>
                            </div>
                            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                              <HiLocationMarker className="mr-2 h-4 w-4 text-amber-300" />
                              <span>{meeting.location || "Not specified"}</span>
                            </div>
                            <div className="flex items-center">
                              <span className="text-xs font-medium px-2.5 py-0.5 rounded bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                                {meeting.meetingType}
                              </span>
                              <span className={`ml-2 text-xs font-medium px-2.5 py-0.5 rounded ${
                                meeting.status === "Completed" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                                  : meeting.status === "Pending"
                                  ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                              }`}>
                                {meeting.status || "Pending"}
                              </span>
                            </div>
                          </div>
                        </div>
                        <button
                          onClick={() => handleViewDetails(meeting)}
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

      {selectedMeeting && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black/40 bg-opacity-60 dark:bg-opacity-80">
          <div className="relative max-h-full w-full max-w-2xl p-4">
            <div className="relative rounded-lg bg-white shadow-xl dark:bg-gray-800">
              <div className="flex items-center justify-between rounded-t border-b border-gray-200 p-4 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {isEditing ? "Edit Meeting" : "Meeting Details"}
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
                    Meeting Title
                  </label>
                  {isEditing ? (
                    <input
                      type="text"
                      value={editedMeeting.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    />
                  ) : (
                    <p className="text-base text-gray-900 dark:text-white">{selectedMeeting.title}</p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Description / Notes
                  </label>
                  {isEditing ? (
                    <textarea
                      rows="4"
                      value={editedMeeting.description || ""}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    />
                  ) : (
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {selectedMeeting.description || "No description provided"}
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
                        value={editedMeeting.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 dark:text-white flex items-center">
                        <HiCalendar className="mr-2 h-4 w-4 text-amber-300" />
                        {selectedMeeting.date}
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
                        value={editedMeeting.time}
                        onChange={(e) => handleInputChange("time", e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 dark:text-white flex items-center">
                        <HiClock className="mr-2 h-4 w-4 text-amber-300" />
                        {selectedMeeting.time}
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
                        value={editedMeeting.duration}
                        onChange={(e) => handleInputChange("duration", e.target.value)}
                        placeholder="e.g., 1 hour"
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      />
                    ) : (
                      <p className="text-sm text-gray-900 dark:text-white">{selectedMeeting.duration}</p>
                    )}
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                      Meeting Type
                    </label>
                    {isEditing ? (
                      <select
                        value={editedMeeting.meetingType}
                        onChange={(e) => handleInputChange("meetingType", e.target.value)}
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 dark:focus:ring-amber-300"
                      >
                        <option value="Virtual">Virtual</option>
                        <option value="In-Person">In-Person</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="Conference Call">Conference Call</option>
                      </select>
                    ) : (
                      <span className="inline-block rounded bg-amber-100 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-amber-900 dark:text-amber-300">
                        {selectedMeeting.meetingType}
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
                      value={editedMeeting.location || ""}
                      onChange={(e) => handleInputChange("location", e.target.value)}
                      placeholder="Meeting location or link"
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    />
                  ) : (
                    <p className="text-sm text-gray-900 dark:text-white flex items-center">
                      <HiLocationMarker className="mr-2 h-4 w-4 text-amber-300" />
                      {selectedMeeting.location || "Not specified"}
                    </p>
                  )}
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Completion Status
                  </label>
                  {isEditing ? (
                    <select
                      value={editedMeeting.status || "Pending"}
                      onChange={(e) => handleInputChange("status", e.target.value)}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-amber-300 focus:ring-amber-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:focus:border-amber-300 dark:focus:ring-amber-300"
                    >
                      <option value="Pending">Pending</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  ) : (
                    <span className={`inline-block rounded px-2.5 py-1 text-xs font-medium ${
                      selectedMeeting.status === "Completed" 
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                        : selectedMeeting.status === "Pending"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                        : selectedMeeting.status === "Cancelled"
                        ? "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300"
                        : "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-300"
                    }`}>
                      {selectedMeeting.status || "Pending"}
                    </span>
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
