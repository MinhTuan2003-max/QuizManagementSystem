import { MainLayout } from '@/components/templates/MainLayout';
import { Button } from '@/components/atoms/Button';
import heroImg from '@/assets/images/quiz-bg-01.png';
import quiz1 from '@/assets/images/capitals_1.png';
import quiz2 from '@/assets/images/capitals_2.png';
import quiz3 from '@/assets/images/capitals_3.png';

const quizzes = [
    {
        id: 1,
        title: 'Capitals of Country',
        duration: '15m',
        description: 'Test your knowledge of country capitals',
        image: quiz1,
    },
    {
        id: 2,
        title: 'Capitals of Country',
        duration: '15m',
        description: 'Test your knowledge of country capitals',
        image: quiz2,
    },
    {
        id: 3,
        title: 'Capitals of Country',
        duration: '15m',
        description: 'Test your knowledge of country capitals',
        image: quiz3,
    },
];

const HomePage: React.FC = () => {
    return (
        <MainLayout>
            <main className="w-full bg-white font-sans text-slate-900">
                {/* Hero */}
                <section
                    aria-labelledby="hero-heading"
                    className="app-container pt-[90px] pb-12 flex flex-col lg:flex-row items-center gap-8"
                >
                    <div className="flex-1 px-4">
                        <h1 id="hero-heading" className="text-4xl lg:text-[40px] leading-tight text-black font-semibold">
                            Welcome to <span className="text-[#38B6FF]">Quiz App</span>
                        </h1>
                        <p className="mt-4 text-base text-slate-700 max-w-xl">
                            The leading online quiz platform. Challenge yourself with thousands of diverse
                            questions and track your progress today. Learn, practice and improve your knowledge
                            with curated quizzes.
                        </p>

                        <div className="mt-6">
                            <a href="/quizzes" aria-label="Take a quiz">
                                <Button className="w-[142px] h-[48px] text-base rounded bg-[#38B6FF] hover:bg-blue-500">
                                    Take a Quiz
                                </Button>
                            </a>
                        </div>
                    </div>

                    <div className="w-full lg:w-[420px] flex justify-center lg:justify-end px-4">
                        <div className="w-[360px] h-[360px] lg:w-[420px] lg:h-[420px] rounded-full overflow-hidden shadow-lg bg-white flex items-center justify-center">
                            <img
                                src={heroImg}
                                alt="Quiz illustration"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </section>

                {/* Quizzes title */}
                <section aria-labelledby="quizzes-heading" className="app-container mt-12">
                    <h2 id="quizzes-heading" className="text-2xl lg:text-3xl text-center text-[#212529] font-normal tracking-wide">
                        QUIZZES
                    </h2>
                </section>

                {/* Quiz list */}
                <section className="app-container mt-6 mb-20">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {quizzes.map((q) => (
                            <article
                                key={q.id}
                                className="bg-white border border-[#CCCCCC] rounded-2xl overflow-hidden flex flex-col shadow-sm"
                                aria-labelledby={`quiz-${q.id}-title`}
                            >
                                <div className="h-[200px] lg:h-[273px] w-full overflow-hidden">
                                    <img
                                        src={q.image}
                                        alt={q.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="p-4 space-y-4 flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="w-full flex justify-between items-center">
                                            <h3 id={`quiz-${q.id}-title`} className="text-xl text-[#212529] font-semibold">
                                                {q.title}
                                            </h3>
                                            <time className="text-sm text-[#212529]" dateTime="PT15M">
                                                {q.duration}
                                            </time>
                                        </div>

                                        <p className="mt-2 text-sm text-[#212529]">{q.description}</p>
                                    </div>

                                    <div className="pt-4">
                                        <a href="/quizzes" className="block">
                                            <Button className="w-full !bg-[#38B6FF] text-lg rounded">Start</Button>
                                        </a>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                </section>
            </main>
        </MainLayout>
    );
};

export default HomePage;