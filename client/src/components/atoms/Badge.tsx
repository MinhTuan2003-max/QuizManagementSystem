interface BadgeProps {
    label: string;
    type?: 'Easy' | 'Medium' | 'Hard' | 'default';
}

const colors: Record<NonNullable<BadgeProps['type']>, string> = {
    Easy: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-yellow-100 text-yellow-700 border-yellow-200",
    Hard: "bg-red-100 text-red-700 border-red-200",
    default: "bg-gray-100 text-gray-700 border-gray-200",
};

export const Badge = ({ label, type = 'default' }: BadgeProps) => {
    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[type]}`}>
            {label}
        </span>
    );
};
