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
            'pending': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
            'contacted': 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100',
            'qualified': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
            'converted': 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100',
            'rejected': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
            'approved': 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100',
            'given_card': 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100',
            'told_to_call': 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100',
        };
        return statusColors[status?.toLowerCase()] || 'bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-100';
    };

    const getHotLabel = (hot) => {
        const hotLabels = {
            'burning': '🔥 Burning',
            'very-hot': '🌋 Very Hot',
            'hot': '🌶️ Hot',
            'warm': '☀️ Warm',
            'tepid': '🌤️ Tepid'
        };
        return hotLabels[hot?.toLowerCase()] || hot;
    };

    const handlePrint = () => {
        window.print();
    };

    const renderTYFTB = (data) => (
        <div className="space-y-4">
            <div className="pb-4 border-b-2 border-amber-300">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">TYB Slip ID</p>
                <p className="font-mono text-base text-gray-900 dark:text-gray-100 mt-1">{safeGet(data, '_id')}</p>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">FROM</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{safeGet(data, 'payer.name')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 break-all mt-1">{safeGet(data, 'payer.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-700">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">TO</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{safeGet(data, 'receiver.name')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 break-all mt-1">{safeGet(data, 'receiver.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-gradient-to-br from-red-50 to-red-100 dark:from-gray-800 dark:to-gray-900 border-2 border-red-300 dark:border-red-600">
                <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Transaction Amount</h3>
                </div>
                <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
                    {formatCurrency(data.business_amount)}
                </p>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700">
                <div className="flex items-center gap-2 mb-3">
                    <Tag className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Business Details</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-3">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Type</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium capitalize mt-1">{safeGet(data, 'business_type')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Referral Type</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300 font-bold uppercase mt-1">{safeGet(data, 'referral_type')}</p>
                    </div>
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Description</p>
                    <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-1">{safeGet(data, 'business_description', 'No description')}</p>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 grid grid-cols-2 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Created</p>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-mono mt-1">{formatDate(safeGet(data, 'created_at'))}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Direction</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-medium capitalize mt-1 px-2 py-1 bg-amber-100 dark:bg-amber-900 rounded">{safeGet(data, 'direction')}</p>
                </div>
            </div>
        </div>
    );

    const renderReferral = (data) => (
        <div className="space-y-4">
            <div className="pb-4 border-b-2 border-amber-300">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Referral ID</p>
                <p className="font-mono text-base text-gray-900 dark:text-gray-100 mt-1 mb-3">{safeGet(data, '_id')}</p>
                <div className="flex gap-2 flex-wrap">
                    {Array.isArray(data.referral_status) && data.referral_status.length > 0 ? (
                        data.referral_status.map((status, idx) => (
                            <span key={idx} className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor(status)}`}>
                                {status.replace(/_/g, ' ').toUpperCase()}
                            </span>
                        ))
                    ) : (
                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${getStatusColor('pending')}`}>
                            PENDING
                        </span>
                    )}
                </div>
            </div>

            {data.hot && data.hot !== 'N/A' && (
                <div className="rounded-lg p-3 bg-red-50 dark:bg-red-900 border-2 border-red-300 dark:border-red-700">
                    <div className="flex items-center gap-2">
                        <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
                        <span className="text-sm font-bold text-red-800 dark:text-red-100">
                            {getHotLabel(data.hot)}
                        </span>
                    </div>
                </div>
            )}

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Referrer (Source)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{safeGet(data, 'referrer.name')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 break-all mt-1">{safeGet(data, 'referrer.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-700">
                <div className="flex items-center gap-2 mb-3">
                    <User className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Referee (Target)</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{safeGet(data, 'referee.name')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 break-all mt-1">{safeGet(data, 'referee.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Contact Information</h3>
                <div className="space-y-2">
                    {data.contact_name && data.contact_name !== '' && (
                        <div className="p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600">
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</p>
                            <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{data.contact_name}</p>
                        </div>
                    )}
                    {data.contact_phone && data.contact_phone !== '' && (
                        <div className="p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <p className="text-sm text-gray-900 dark:text-gray-100 font-medium">{data.contact_phone}</p>
                        </div>
                    )}
                    {data.contact_email && data.contact_email !== '' && (
                        <div className="p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                            <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <p className="text-sm text-gray-900 dark:text-gray-100 break-all">{data.contact_email}</p>
                        </div>
                    )}
                    {data.contact_address && data.contact_address !== '' && (
                        <div className="p-2 bg-white dark:bg-gray-700 rounded border border-gray-200 dark:border-gray-600 flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <p className="text-sm text-gray-900 dark:text-gray-100">{data.contact_address}</p>
                        </div>
                    )}
                </div>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700">
                <h3 className="font-bold text-gray-900 dark:text-white mb-3">Referral Details</h3>
                <div className="space-y-3">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Type</p>
                        <p className="text-sm text-amber-700 dark:text-amber-300 font-bold uppercase mt-1">{safeGet(data, 'referral_type')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Description</p>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-1">{safeGet(data, 'description', 'No description')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 grid grid-cols-2 gap-4">
                <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Created</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-mono mt-1">{formatDate(safeGet(data, 'created_at'))}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Direction</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-medium capitalize mt-1 px-2 py-1 bg-amber-100 dark:bg-amber-900 rounded">{safeGet(data, 'direction')}</p>
                </div>
            </div>
        </div>
    );

    const renderM2M = (data) => (
        <div className="space-y-4">
            <div className="pb-4 border-b-2 border-amber-300">
                <p className="text-xs font-bold text-gray-600 dark:text-gray-400 uppercase tracking-wide">Meeting ID</p>
                <p className="font-mono text-base text-gray-900 dark:text-gray-100 mt-1">{safeGet(data, '_id')}</p>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Member 1</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{safeGet(data, 'member1.name')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 break-all mt-1">{safeGet(data, 'member1.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-red-200 dark:border-red-700">
                <div className="flex items-center gap-2 mb-3">
                    <Users className="w-5 h-5 text-red-600 dark:text-red-400" />
                    <h3 className="font-bold text-gray-900 dark:text-white">Member 2</h3>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Name</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{safeGet(data, 'member2.name')}</p>
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Email</p>
                        <p className="text-sm text-gray-900 dark:text-gray-100 break-all mt-1">{safeGet(data, 'member2.email')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-white dark:bg-gray-800 border-2 border-amber-200 dark:border-amber-700">
                <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase mb-2">Created By</p>
                <p className="text-sm text-gray-900 dark:text-gray-100 font-bold">{safeGet(data, 'created_by.name')}</p>
                <p className="text-xs text-gray-600 dark:text-gray-400">{safeGet(data, 'created_by.email')}</p>
            </div>

            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600">
                <div className="space-y-4">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Meeting Date</p>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{formatDate(safeGet(data, 'meeting_date'))}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MapPin className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Location</p>
                        </div>
                        <p className="text-sm text-gray-900 dark:text-gray-100 font-medium mt-1">{safeGet(data, 'location')}</p>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <MessageSquare className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Discussion Points</p>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed mt-1">{safeGet(data, 'discussion_points', 'No discussion points')}</p>
                    </div>
                </div>
            </div>

            <div className="rounded-lg p-4 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 grid grid-cols-2 gap-4">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                        <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Created</p>
                    </div>
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-mono mt-1">{formatDate(safeGet(data, 'createdAt'))}</p>
                </div>
                <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase">Direction</p>
                    <p className="text-sm text-gray-900 dark:text-gray-100 font-medium capitalize mt-1 px-2 py-1 bg-amber-100 dark:bg-amber-900 rounded">{safeGet(data, 'direction')}</p>
                </div>
            </div>
        </div>
    );

    const renderDefault = () => (
        <div className="space-y-3 text-gray-900 dark:text-gray-100">
            <p className="text-center text-gray-500 dark:text-gray-400">No details available</p>
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
            case 'tyftb': return 'TYB Slip';
            case 'referral': return 'Referral';
            case 'm2m': return 'One-to-One Meeting';
            default: return 'Details';
        }
    };

    return (
        <>
            <Button
                onClick={() => setOpenModal(true)}
                className="h-[40px] cursor-pointer w-[130px] text-nowrap bg-amber-500 hover:bg-amber-600 rounded-lg border-0 text-[12px] font-bold text-white transition-all duration-200 shadow-md hover:shadow-lg ml-4"
            >
                View Details
            </Button>

            <Modal
                show={openModal}
                size="md"
                onClose={handler}
                popup
                initialFocus={initialFocusRef}
                className="fixed inset-0 bg-black/50"
            >
                <ModalHeader className="border-b-2 border-amber-300 px-6 py-4 bg-white dark:bg-gray-900">
                    <div className="flex items-center gap-3 w-full">
                        <div className="p-2 bg-amber-100 dark:bg-amber-900 rounded-lg">
                            <FileText className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                                {getTypeLabel()}
                            </h3>
                            <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mt-0.5">
                                {content.direction}
                            </p>
                        </div>
                    </div>
                </ModalHeader>

                <ModalBody className="px-6 py-4 bg-white dark:bg-gray-900">
                    <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-amber-300 scrollbar-track-gray-100 dark:scrollbar-thumb-amber-700 dark:scrollbar-track-gray-800">
                        {renderContent()}
                    </div>
                </ModalBody>

                <div className="flex justify-center gap-3 p-6 border-t-2 border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                    <Button
                        color="gray"
                        onClick={handler}
                        ref={initialFocusRef}
                        className="w-1/3 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white border-0 font-semibold"
                    >
                        Close
                    </Button>
                    <Button
                        onClick={handlePrint}
                        className="w-1/3 bg-amber-500 hover:bg-amber-600 dark:bg-amber-600 dark:hover:bg-amber-700 text-white border-0 font-semibold transition-all duration-200"
                    >
                        Print
                    </Button>
                </div>
            </Modal>
        </>
    );
}
