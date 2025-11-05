import React, { useState } from "react"

const AlertSystem = ({ onAlertSent }) => {
  const [formData, setFormData] = useState({
    type: "Announcement",
    title: "",
    message: "",
    recipients: {
      allMembers: true,
      coordinators: false,
    },
    notificationMethods: {
      email: true,
      sms: false,
    }
  })

  const [loading, setLoading] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const handleTypeChange = (type) => {
    setFormData(prev => ({ ...prev, type }))
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleRecipientChange = (recipient) => {
    setFormData(prev => ({
      ...prev,
      recipients: {
        ...prev.recipients,
        [recipient]: !prev.recipients[recipient]
      }
    }))
  }

  const handleNotificationChange = (method) => {
    setFormData(prev => ({
      ...prev,
      notificationMethods: {
        ...prev.notificationMethods,
        [method]: !prev.notificationMethods[method]
      }
    }))
  }

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Alert title is required')
      return false
    }
    if (!formData.message.trim()) {
      setError('Alert message is required')
      return false
    }
    if (!formData.recipients.allMembers && !formData.recipients.coordinators) {
      setError('Please select at least one recipient group')
      return false
    }
    if (!formData.notificationMethods.email && !formData.notificationMethods.sms) {
      setError('Please select at least one notification method')
      return false
    }
    return true
  }

  const handleSendNow = async () => {
    if (!validateForm()) return

    setLoading(true)
    setError(null)
    
    try {
      // API call placeholder
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess('Alert sent successfully!')
      setTimeout(() => setSuccess(null), 3000)
      
      // Reset form
      setFormData({
        type: "Announcement",
        title: "",
        message: "",
        recipients: {
          allMembers: true,
          coordinators: false,
        },
        notificationMethods: {
          email: true,
          sms: false,
        }
      })
      
      onAlertSent?.()
    } catch (err) {
      setError('Failed to send alert')
    } finally {
      setLoading(false)
    }
  }

  const handleSchedule = async () => {
    if (!validateForm()) return
    
    setLoading(true)
    setError(null)
    
    try {
      // API call placeholder
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      setSuccess('Alert scheduled successfully!')
      setTimeout(() => setSuccess(null), 3000)
    } catch (err) {
      setError('Failed to schedule alert')
    } finally {
      setLoading(false)
    }
  }

  const alertTypeColors = {
    Announcement: 'border-blue-300 bg-blue-50 dark:bg-blue-950',
    Urgent: 'border-red-300 bg-red-50 dark:bg-red-950',
    'Event Info': 'border-green-300 bg-green-50 dark:bg-green-950'
  }

  return (
    <div className="
      w-full rounded-2xl p-4 sm:p-6 lg:p-8
      bg-white dark:bg-gray-800 
      shadow-lg border border-gray-200 dark:border-gray-700
      transition-colors duration-300
    ">
      <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-gray-900 dark:text-gray-50">
        Alert System
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg">
          <p className="text-sm text-red-700 dark:text-red-200">{error}</p>
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg">
          <p className="text-sm text-green-700 dark:text-green-200">{success}</p>
        </div>
      )}

      <div className="mb-6">
        <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-200 text-sm">
          Alert Type:
        </label>
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {["Announcement", "Urgent", "Event Info"].map(type => (
            <label key={type} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="type"
                value={type}
                checked={formData.type === type}
                onChange={() => handleTypeChange(type)}
                className="accent-blue-500 scale-110"
              />
              <span className="text-gray-900 dark:text-gray-100 text-sm">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-sm">
          Alert Title:
        </label>
        <input
          type="text"
          value={formData.title}
          placeholder="Enter alert title"
          onChange={(e) => handleInputChange('title', e.target.value)}
          className="
            w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
            transition-all duration-200
          "
        />
      </div>

      <div className="mb-6">
        <label className="block mb-2 font-semibold text-gray-800 dark:text-gray-200 text-sm">
          Alert Message:
        </label>
        <textarea
          value={formData.message}
          placeholder="Enter your message"
          onChange={(e) => handleInputChange('message', e.target.value)}
          rows={4}
          className="
            w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-700
            bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent
            transition-all duration-200 resize-none
          "
        />
      </div>

      <div className="mb-6">
        <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-200 text-sm">
          Recipients:
        </label>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.recipients.allMembers} 
              onChange={() => handleRecipientChange('allMembers')}
              className="accent-blue-500 scale-110"
            />
            <span className="text-gray-900 dark:text-gray-100 text-sm">All Members</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.recipients.coordinators} 
              onChange={() => handleRecipientChange('coordinators')}
              className="accent-blue-500 scale-110"
            />
            <span className="text-gray-900 dark:text-gray-100 text-sm">Coordinators Only</span>
          </label>
        </div>
      </div>

      <div className="mb-8">
        <label className="block mb-3 font-semibold text-gray-800 dark:text-gray-200 text-sm">
          Notification Methods:
        </label>
        <div className="flex flex-wrap gap-4 sm:gap-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.notificationMethods.email} 
              onChange={() => handleNotificationChange('email')}
              className="accent-blue-500 scale-110"
            />
            <span className="text-gray-900 dark:text-gray-100 text-sm">Notify via Email</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input 
              type="checkbox" 
              checked={formData.notificationMethods.sms} 
              onChange={() => handleNotificationChange('sms')}
              className="accent-blue-500 scale-110"
            />
            <span className="text-gray-900 dark:text-gray-100 text-sm">Notify via SMS</span>
          </label>
        </div>
      </div>

      {showPreview && (
        <div className={`
          mb-6 p-4 rounded-lg border-2
          ${alertTypeColors[formData.type]}
        `}>
          <h3 className="font-bold mb-2 text-gray-900 dark:text-gray-50">Preview:</h3>
          <p className="font-semibold mb-2 text-gray-900 dark:text-gray-50">{formData.title}</p>
          <p className="text-gray-700 dark:text-gray-300 whitespace-pre-wrap">{formData.message}</p>
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button 
          onClick={() => setShowPreview(!showPreview)}
          disabled={loading}
          className="
            flex-1 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
            font-semibold bg-gray-100 dark:bg-gray-900 
            text-gray-900 dark:text-gray-100
            hover:bg-gray-200 dark:hover:bg-gray-800
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-colors duration-200 text-sm
          "
        >
          {showPreview ? 'Hide Preview' : 'Preview Alert'}
        </button>
        
        <button 
          onClick={handleSendNow}
          disabled={loading}
          className="
            flex-1 px-4 py-3 rounded-lg font-semibold
            bg-yellow-400 text-black
            hover:bg-yellow-500 
            disabled:opacity-50 disabled:cursor-not-allowed
            transition-all duration-200 text-sm
            dark:bg-yellow-500 dark:text-gray-900 
            dark:hover:bg-yellow-400
            focus:ring-4 focus:ring-yellow-300 dark:focus:ring-yellow-600
          "
        >
          {loading ? 'Sending...' : 'Send Now'}
        </button>
      </div>

      <button 
        onClick={handleSchedule}
        disabled={loading}
        className="
          w-full mt-3 px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600
          font-semibold bg-gray-100 dark:bg-gray-900 
          text-gray-900 dark:text-gray-100
          hover:bg-gray-200 dark:hover:bg-gray-800
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-200 text-sm
        "
      >
        {loading ? 'Scheduling...' : 'Schedule'}
      </button>
    </div>
  )
}

export default AlertSystem
