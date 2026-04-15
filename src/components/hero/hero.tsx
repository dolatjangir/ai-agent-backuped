"use client"
import { ArrowRight, Play, Sparkles, Star } from 'lucide-react'
import Link from 'next/link'
interface User {
  id: string;
  name: string;
  avatar: string;
  role: 'member' | 'moderator' | 'admin' | 'expert';
  reputation: number;
  joinedAt: string;
  location?: string;
  bio?: string;
  badges: string[];
}
const topUsers: User[] = [
  { id: '1', name: 'Sarah Chen', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', role: 'admin', reputation: 5420, joinedAt: '2022-01-10', badges: ['Founding Member', 'Community Hero'] },
  { id: '2', name: 'Marcus Johnson', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', role: 'moderator', reputation: 3890, joinedAt: '2022-08-22', badges: ['Technical Expert'] },
  { id: '3', name: 'Emma Wilson', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face', role: 'expert', reputation: 3150, joinedAt: '2023-02-14', badges: ['Rising Star'] },
  { id: '4', name: 'David Park', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', role: 'member', reputation: 1280, joinedAt: '2023-11-05', badges: [] },
];


function Hero() {
  return (
    <div>
         {/* Hero Section */}
            <section className="relative mt-12 pt-28 pb-20 lg:pt-24 lg:pb-32 overflow-hidden">
              <div className="absolute inset-0 bg-[url('/assets/mobile-screen-hero-image.png')] sm:bg-[url('https://res.cloudinary.com/djipgt6vc/image/upload/v1774335521/hero-2_daxnm1.png')] bg-center bg-cover lg:h-screen after:bg-slate-900/10 after:absolute after:top-0 after:left-0 after:w-full after:h-full bg-no-repeat " />
              <div className="absolute top-0 right-0 w-1/2 h-full  to-transparent " />
              
              <div className="relative w-full h-full  px-[var(--space-4)] sm:px-[var(--space-6)] lg:px-[var(--space-8)]">
                <div className="grid sm:grid-cols-2   items-center">
                  <div className="space-y-[var(--space-4)]">
                    <div className="inline-flex items-center gap-[var(--space-2)] px-[var(--space-2)] py-[var(--space-2)] rounded-[var(--radius-full)] bg-[var(--color-primary-100)] text-[var(--color-primary-700)] text-sm font-semibold">
                      <Sparkles className="w-4 h-4" />
                      <span>Helping 10,000+ property managers grow faster</span>
                    </div>
                    
                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight tracking-tight text-white ">
                      Get More Leads and Close More Deals{" "}
                      <span className="bg-white bg-clip-text text-transparent">
                     with Smart AI Automation
                      </span>
                      
                    </h1>
                    
                    <p className="text-xl text-[var(--color-secondary-50)] leading-relaxed max-w-xl">
                   Capture enquiries, match the right buyers, follow up on time, and close deals faster — all in one simple system.
                    </p>
      
                    <div className="flex flex-col sm:flex-row gap-[var(--space-4)]">
                      <Link href='https://app.estateai.in/register' className="cursor-pointer">
                      <button className="group px-[var(--space-8)] py-[var(--space-4)] bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)] text-[var(--text-inverse)] font-semibold rounded-[var(--radius-full)] transition-all duration-[var(--duration-fast)] shadow-xl hover:shadow-2xl flex items-center justify-center gap-[var(--space-2)]" style={{ boxShadow: '0 20px 25px -5px var(--color-primary-600)/25' }}>
                        Get Started Free
                        <ArrowRight className="w-5 h-5 hover:translate-x-1 transition-transform duration-[var(--duration-fast)]" />
                      </button></Link>
                      {/* <Link href='/book-demo' className="cursor-pointer">
                      <button className="group px-[var(--space-8)] py-[var(--space-4)] bg-[var(--bg-primary)] hover:bg-[var(--bg-secondary)] text-[var(--text-primary)] font-semibold rounded-[var(--radius-full)] transition-all duration-[var(--duration-fast)] border border-[var(--border-medium)] shadow-lg flex items-center justify-center gap-[var(--space-2)]">
                        <Play className="w-5 h-5 text-[var(--color-primary-600)] " />
                        Book a Demo
                      </button></Link> */}
                    </div>
      
                    <div className="flex items-center gap-[var(--space-6)] pt-[var(--space-4)]">
                      <div className="flex -space-x-[var(--space-3)]">
                        {topUsers.map((user) => (
                          <img key={user.id} src={user.avatar} alt={user.name} className="w-10 h-10 rounded-full border-2 border-[var(--color-primary-100)] bg-[var(--color-primary-50)]" />
                        ))}
                        <div className="min-w-10 min-h-10 rounded-full bg-[var(--color-primary-50)] border-2 border-[var(--color-primary-100)] flex items-center justify-center text-xs text-[var(--color-primary-500)]">
                  +886
                </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-1">
                          {[1,2,3,4,5].map((i) => (
                            <Star key={i} className="w-4 h-4 fill-[var(--color-warning-500)] text-[var(--color-warning-500)]" />
                          ))}
                        </div>
                        <p className="text-sm text-white">Loved by 2,000+ property professionals</p>
                      </div>
                    </div>
                  </div>
      
                 <div className="hero-visual relative">
                       <div className="bg-transparent   rounded-3xl   relative z-10 ">
                        <img
                          src="https://res.cloudinary.com/djipgt6vc/image/upload/v1774335519/hero-right-img-estateai_qvw9of.png" 
                           alt="Modern Luxury Apartment" 
                           
                           className="rounded-2xl w-full h-full object-cover"
                         />
                      
                       </div>
                     </div>
                </div>
              </div>
            </section>
    </div>
  )
}

export default Hero
