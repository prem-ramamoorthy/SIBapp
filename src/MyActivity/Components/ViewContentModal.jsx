import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState, useRef } from "react";
import { Phone, Mail, MapPin, User, Calendar, DollarSign, Tag, Users, MessageSquare, AlertCircle, FileText } from "lucide-react";

export function ModalViewer({ content = {} }) {
    const [openModal, setOpenModal] = useState(false);
    const initialFocusRef = useRef(null);

    const handler = () => {
        setOpenModal(false);
    };

    const safeGet = (obj, path, defaultValue = 'N/A') => {
        try {
            const value = path.split('.').reduce((acc, part) => acc?.[part], obj);
            return value || defaultValue;
        } catch {
            return defaultValue;
        }
    };

    const formatDate = (dateString) => {
        try {
            if (!dateString) return 'N/A';
            return new Date(dateString).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            });
        } catch {
            return 'N/A';
        }
    };

    const formatCurrency = (amount) => {
        if (!amount) return '₹0.00';
        
        // Handle Decimal128 format
        if (amount.$numberDecimal) {
            const num = parseFloat(amount.$numberDecimal);
            return '₹' + num.toLocaleString('en-IN', {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            });
        }
        
        const num = parseFloat(amount);
        return '₹' + num.toLocaleString('en-IN', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    };

    const getStatusColor = (status) => {
        const statusColors = {
            'pending': 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
            'contacted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'qualified': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'converted': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
            'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
            'approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
            'given_card': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
            'told_to_call': 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200',
        };
        return statusColors[status?.toLowerCase()] || 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    };

    const getHotLabel = (hot) => {
        const hotLabels = {
            'burning': '🌋 Burning Hot',
            'very-hot': '🔥 Hot',
            'hot': '🌶️ Hot',
            'Warm': '☀️ Warm',
            'Tepid': '🌤 Tepid'
        };
        return hotLabels[hot?.toLowerCase()] || hot;
    };

    const handlePrint = () => {
        window.print();
    };

    const renderTYFTB = (data) => (
        <div className="space-y-4 text-gray-900 dark:text-gray-100">
            <div className="mb-6 pb-4 border-b border-gray-300 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">TYFTB SLIP ID</p>
                <p className="font-mono text-lg">{safeGet(data, '_id')}</p>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-yellow-50 dark:bg-yellow-900">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5" />
                    <h3 className="font-bold">Payer Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-semibold">{safeGet(data, 'payer.name')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm break-all">{safeGet(data, 'payer.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-amber-50 dark:bg-amber-900">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5" />
                    <h3 className="font-bold">Receiver Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-semibold">{safeGet(data, 'receiver.name')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm break-all">{safeGet(data, 'receiver.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 mb-4 border-2 border-yellow-200 dark:border-yellow-700">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5" />
                    <h3 className="font-bold">Transaction Amount</h3>
                </div>
                <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {formatCurrency(data.business_amount)}
                </p>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-yellow-50 dark:bg-yellow-900">
                <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5" />
                    <h3 className="font-bold">Business Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Business Type</p>
                        <p className="font-semibold capitalize">{safeGet(data, 'business_type')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Referral Type</p>
                        <p className="font-semibold uppercase">{safeGet(data, 'referral_type')}</p>
                    </div>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                    <p className="text-sm leading-relaxed">{safeGet(data, 'business_description', 'No description')}</p>
                </div>
            </div>

            <div className="rounded-lg p-4 grid grid-cols-2 gap-4 border border-gray-300 dark:border-gray-600">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                    </div>
                    <p className="text-sm font-mono">{formatDate(safeGet(data, 'created_at'))}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Direction</p>
                    <p className="text-sm font-semibold capitalize">{safeGet(data, 'direction')}</p>
                </div>
            </div>
        </div>
    );

    const renderReferral = (data) => (
        <div className="space-y-4 text-gray-900 dark:text-gray-100">
            <div className="mb-6 pb-4 border-b border-gray-300 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold mb-2">REFERRAL ID</p>
                <p className="font-mono text-lg mb-3">{safeGet(data, '_id')}</p>
                <div className="flex gap-2 flex-wrap">
                    {Array.isArray(data.referral_status) && data.referral_status.length > 0 ? (
                        data.referral_status.map((status, idx) => (
                            <span key={idx} className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
                                {status.replace(/_/g, ' ').toUpperCase()}
                            </span>
                        ))
                    ) : (
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor('pending')}`}>
                            Pending
                        </span>
                    )}
                </div>
            </div>

            {data.hot && data.hot !== 'N/A' && (
                <div className="mb-4">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        <span className="px-3 py-1 rounded-full text-sm font-bold bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200">
                            {getHotLabel(data.hot)}
                        </span>
                    </div>
                </div>
            )}

            <div className="rounded-lg p-4 mb-4 bg-yellow-50 dark:bg-yellow-900">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5" />
                    <h3 className="font-bold">Referrer (Source)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-semibold">{safeGet(data, 'referrer.name')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm break-all">{safeGet(data, 'referrer.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-amber-50 dark:bg-amber-900">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5" />
                    <h3 className="font-bold">Referee (Target)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-semibold">{safeGet(data, 'referee.name')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm break-all">{safeGet(data, 'referee.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 mb-4 border border-gray-300 dark:border-gray-600">
                <h3 className="font-bold mb-3">Contact Information</h3>
                <div className="space-y-3">
                    {data.contact_name && data.contact_name !== '' && (
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Contact Name</p>
                            <p className="font-semibold">{data.contact_name}</p>
                        </div>
                    )}
                    {data.contact_phone && data.contact_phone !== '' && (
                        <div className="flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            <p className="font-semibold">{data.contact_phone}</p>
                        </div>
                    )}
                    {data.contact_email && data.contact_email !== '' && (
                        <div className="flex items-center gap-2">
                            <Mail className="w-4 h-4" />
                            <p className="text-sm break-all">{data.contact_email}</p>
                        </div>
                    )}
                    {data.contact_address && data.contact_address !== '' && (
                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" />
                            <p className="text-sm">{data.contact_address}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-yellow-50 dark:bg-yellow-900">
                <h3 className="font-bold mb-3">Referral Details</h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Referral Type</p>
                        <p className="font-semibold uppercase">{safeGet(data, 'referral_type')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Description</p>
                        <p className="text-sm leading-relaxed">{safeGet(data, 'description', 'No description')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 grid grid-cols-2 gap-4 border border-gray-300 dark:border-gray-600">
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created Date</p>
                    <p className="text-sm font-mono">{formatDate(safeGet(data, 'created_at'))}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Direction</p>
                    <p className="text-sm font-semibold capitalize">{safeGet(data, 'direction')}</p>
                </div>
            </div>
        </div>
    );

    const renderM2M = (data) => (
        <div className="space-y-4 text-gray-900 dark:text-gray-100">
            <div className="mb-6 pb-4 border-b border-gray-300 dark:border-gray-600">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-semibold">MEETING ID</p>
                <p className="font-mono text-lg">{safeGet(data, '_id')}</p>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-yellow-50 dark:bg-yellow-900">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5" />
                    <h3 className="font-bold">Member 1</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-semibold">{safeGet(data, 'member1.name')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm break-all">{safeGet(data, 'member1.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-amber-50 dark:bg-amber-900">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5" />
                    <h3 className="font-bold">Member 2</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                        <p className="font-semibold">{safeGet(data, 'member2.name')}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                        <p className="text-sm break-all">{safeGet(data, 'member2.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 mb-4 bg-yellow-50 dark:bg-yellow-900">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Created By</p>
                <p className="font-semibold">{safeGet(data, 'created_by.name')}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300">{safeGet(data, 'created_by.email')}</p>
            </div>

            <div className="rounded-lg p-4 mb-4 border border-gray-300 dark:border-gray-600">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Meeting Date & Time</p>
                        </div>
                        <p className="font-semibold">{formatDate(safeGet(data, 'meeting_date'))}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Location</p>
                        </div>
                        <p className="font-semibold">{safeGet(data, 'location')}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-4 h-4" />
                            <p className="text-sm text-gray-500 dark:text-gray-400">Discussion Points</p>
                        </div>
                        <p className="text-sm leading-relaxed">{safeGet(data, 'discussion_points', 'No discussion points')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 grid grid-cols-2 gap-4 border border-gray-300 dark:border-gray-600">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <Calendar className="w-4 h-4" />
                        <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                    </div>
                    <p className="text-sm font-mono">{formatDate(safeGet(data, 'createdAt'))}</p>
                </div>
                <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Direction</p>
                    <p className="text-sm font-semibold capitalize">{safeGet(data, 'direction')}</p>
                </div>
            </div>
        </div>
    );

    const renderDefault = () => (
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
            <p className="text-center text-gray-500">No details available</p>
        </div>
    );

    const renderContent = () => {
        const type = content.type?.toLowerCase();

        switch (type) {
            case 'tyftb':
                return renderTYFTB(content);
            case 'referral':
                return renderReferral(content);
            case 'm2m':
                return renderM2M(content);
            default:
                return renderDefault();
        }
    };

    const getTypeLabel = () => {
        const type = content.type?.toLowerCase();
        switch(type) {
            case 'tyftb': return 'TYFTB Slip';
            case 'referral': return 'Referral';
            case 'm2m': return 'One-to-One Meeting';
            default: return 'Details';
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpenModal(true)}
                className="h-[40px] cursor-pointer w-[140px] text-nowrap bg-yellow-500 p-1 rounded-2xl hover:bg-yellow-600 border-2 text-[12px] font-bold border-gray-400 dark:border-gray-600 text-gray-900 transition-colors duration-300 ml-4"
            >
                View Details
            </Button>

            <Modal
                show={openModal}
                size="md"
                onClose={handler}
                popup
                initialFocus={initialFocusRef}
            >
                <ModalHeader className="border-b dark:border-gray-700 px-6 py-4 bg-yellow-50 dark:bg-yellow-900">
                    <div className="flex items-center gap-3">
                        <FileText className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">
                                {getTypeLabel()}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 capitalize">{content.direction}</p>
                        </div>
                    </div>
                </ModalHeader>

                <ModalBody className="px-6 py-4">
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
                        {renderContent()}
                    </div>
                </ModalBody>

                <div className="flex justify-center gap-3 p-6 border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-900">
                    <Button
                        color="gray"
                        onClick={handler}
                        ref={initialFocusRef}
                        className="w-1/3"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handlePrint}
                        className="w-1/3 bg-yellow-500 hover:bg-yellow-600 text-gray-900 border-0"
                    >
                        Print
                    </Button>
                </div>
            </Modal>
        </>
    );
}