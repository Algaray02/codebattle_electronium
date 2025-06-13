import React from 'react';
import {
    Code2,
    Trophy,
    Zap,
    Target,
    Crown,
    Star,
    ChevronRight,
    Play,
    Users,
    Brain,
    Award,
    Gamepad2
} from 'lucide-react';
import { Head } from '@inertiajs/react';

export default function Welcome() {
    // Contoh data difficulties diambil dari data question
    const difficulties = [
        { name: 'Easy', points: 10, color: 'from-green-400 to-emerald-500', icon: Target },
        { name: 'Medium', points: 25, color: 'from-yellow-400 to-orange-500', icon: Zap },
        { name: 'Hard', points: 50, color: 'from-red-400 to-pink-500', icon: Trophy }
    ];

    // Contoh data ranks
    const ranks = [
        { name: 'Bronze', range: '0-99', color: 'text-orange-400' },
        { name: 'Silver', range: '100-199', color: 'text-gray-300' },
        { name: 'Master', range: '200-399', color: 'text-blue-400' },
        { name: 'Epic', range: '400-599', color: 'text-purple-400' },
        { name: 'Legend', range: '600-799', color: 'text-yellow-400' },
        { name: 'Glory', range: '800-999', color: 'text-pink-400' },
        { name: 'Honor', range: '1000-1499', color: 'text-cyan-400' },
        { name: 'Immortal', range: '1500+', color: 'text-red-400' }
    ];

    const features = [
        {
            icon: Brain,
            title: 'AI-Powered Challenges',
            description: 'Tingkatkan skill dengan soal yang di-generate AI sesuai level kemampuan Anda'
        },
        {
            icon: Users,
            title: 'Competitive Leaderboard',
            description: 'Bersaing dengan developer lain dan raih posisi teratas di leaderboard'
        },
        {
            icon: Award,
            title: 'Ranking System',
            description: 'Naik pangkat dari Bronze hingga Immortal dengan sistem poin yang fair'
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden">
            <Head title="Welcome" />
            <div className="fixed inset-0 opacity-10">
                <div className="absolute top-10 left-10 w-72 h-72 bg-purple-500 rounded-full filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-green-500 rounded-full filter blur-3xl animate-pulse delay-500"></div>
            </div>

            <nav className="relative z-10 flex justify-between items-center p-6 backdrop-blur-sm bg-black/20 border-b border-gray-800">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                        <Code2 className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Code Battle
                    </h1>
                </div>
                <div className="flex space-x-4">
                    <button className="px-6 py-2 border border-gray-700 rounded-lg hover:border-purple-500 transition-colors duration-200">
                        Login
                    </button>
                    <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 transform hover:scale-105">
                        Register
                    </button>
                </div>
            </nav>

            <section className="relative z-10 container mx-auto px-6 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-full mb-8">
                        <Gamepad2 className="h-4 w-4 mr-2" />
                        <span className="text-sm">Platform Coding Battle Terdepan</span>
                    </div>

                    <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
                        Asah Skill
                        <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent block">
                            Programming
                        </span>
                        dengan AI Mentor
                    </h1>

                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto leading-relaxed">
                        Bergabunglah dalam pertempuran coding yang menantang! Tingkatkan kemampuan programming Anda
                        dengan soal-soal yang di-generate AI sesuai level keahlian.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <button className="group px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl font-semibold text-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center">
                            <Play className="h-5 w-5 mr-2" />
                            Mulai Battle
                            <ChevronRight className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" />
                        </button>
                        <button className="px-8 py-4 border border-gray-700 rounded-xl font-semibold text-lg hover:border-purple-500 hover:bg-purple-500/10 transition-all duration-200">
                            Lihat Leaderboard
                        </button>
                    </div>
                </div>
            </section>

            <section className="relative z-10 container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Level Kesulitan</h2>
                    <p className="text-gray-400 text-lg">Pilih level yang sesuai dengan kemampuan Anda</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                    {difficulties.map((diff, index) => {
                        const IconComponent = diff.icon;
                        return (
                            <div
                                key={diff.name}
                                className="group relative bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2"
                            >
                                <div className={`absolute inset-0 bg-gradient-to-r ${diff.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                                <div className={`inline-flex p-4 bg-gradient-to-r ${diff.color} rounded-xl mb-6`}>
                                    <IconComponent className="h-8 w-8 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">{diff.name}</h3>
                                <p className="text-3xl font-bold text-green-400 mb-4">{diff.points} Points</p>
                                <p className="text-gray-400">
                                    {diff.name === 'Easy' && 'Cocok untuk pemula yang baru memulai journey programming'}
                                    {diff.name === 'Medium' && 'Tantangan menengah untuk developer yang ingin berkembang'}
                                    {diff.name === 'Hard' && 'Level expert untuk programmer berpengalaman'}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="relative z-10 container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Sistem Ranking</h2>
                    <p className="text-gray-400 text-lg">Naik pangkat seiring dengan bertambahnya poin Anda</p>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                    {ranks.map((rank, index) => (
                        <div
                            key={rank.name}
                            className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 text-center hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
                        >
                            <Crown className={`h-8 w-8 mx-auto mb-3 ${rank.color}`} />
                            <h3 className={`text-xl font-bold mb-2 ${rank.color}`}>{rank.name}</h3>
                            <p className="text-gray-400 text-sm">{rank.range} points</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="relative z-10 container mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold mb-4">Mengapa Code Battle?</h2>
                    <p className="text-gray-400 text-lg">Platform terbaik untuk mengasah skill programming Anda</p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {features.map((feature, index) => {
                        const IconComponent = feature.icon;
                        return (
                            <div
                                key={feature.title}
                                className="bg-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 hover:border-purple-500/50 transition-all duration-300 transform hover:scale-105"
                            >
                                <div className="inline-flex p-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl mb-6">
                                    <IconComponent className="h-8 w-8 text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            <section className="relative z-10 container mx-auto px-6 py-20 text-center">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-5xl font-bold mb-6">
                        Siap untuk
                        <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent block">
                            Battle?
                        </span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                        Bergabunglah dengan ribuan developer lainnya dan buktikan kemampuan coding Anda!
                    </p>
                    <button className="group px-12 py-5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl font-bold text-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
                        <Star className="h-6 w-6 mr-3" />
                        Mulai Code Battle Sekarang
                        <ChevronRight className="h-6 w-6 ml-3 group-hover:translate-x-2 transition-transform" />
                    </button>
                </div>
            </section>

            <footer className="relative z-10 border-t border-gray-800 py-12">
                <div className="container mx-auto px-6 text-center">
                    <div className="flex items-center justify-center space-x-3 mb-6">
                        <div className="p-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
                            <Code2 className="h-6 w-6" />
                        </div>
                        <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Code Battle
                        </h3>
                    </div>
                    <p className="text-gray-400">
                        © 2025 Code Battle. Platform coding battle terbaik untuk developer Indonesia.
                    </p>
                </div>
            </footer>
        </div>
    );
};