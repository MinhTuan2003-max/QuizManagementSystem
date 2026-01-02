import { Badge } from '../atoms/Badge';
import { Button } from '../atoms/Button';
import { Play } from 'lucide-react';

interface QuizCardProps {
    title: string;
    thumbnail: string;
    description: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
}

export const QuizCard = ({ title, thumbnail, description, difficulty }: QuizCardProps) => {
    return (
        <div className="group bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
            <div className="relative h-44 w-full overflow-hidden">
                <img
                    src={thumbnail}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 right-3">
                    <Badge label={difficulty} type={difficulty} />
                </div>
            </div>
            <div className="p-5">
                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{title}</h3>
                <p className="text-gray-500 text-sm line-clamp-2 mb-4 h-10">{description}</p>
                <Button variant="outline" className="w-full" leftIcon={<Play size={16} />}>
                    Start Quiz
                </Button>
            </div>
        </div>
    );
};