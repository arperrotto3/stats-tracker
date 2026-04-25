import { useEffect, useState } from 'react'

function Landing() {
    const [scrollY, setScrollY] = useState(0)

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <div style={{ fontFamily: 'Rajdhani, sans-serif', background: '#0a0a0f', minHeight: '100vh', color: 'white', overflowX: 'hidden' }}>
            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                @keyframes glow {
                    0%, 100% { opacity: 0.4; }
                    50% { opacity: 1; }
                }
                @keyframes slideUp {
                    from { opacity: 0; transform: translateY(40px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }
                .hero-title {
                    font-family: 'Cinzel', serif;
                    font-size: clamp(3rem, 8vw, 6rem);
                    font-weight: 900;
                    line-height: 1.05;
                    background: linear-gradient(135deg, #C89B3C 0%, #F0E6D3 40%, #C89B3C 60%, #785A28 100%);
                    background-size: 200% auto;
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    animation: shimmer 4s linear infinite, slideUp 1s ease forwards;
                    letter-spacing: 0.08em;
                }
                .subtitle {
                    animation: slideUp 1s ease 0.3s both;
                }
                .cta-buttons {
                    animation: slideUp 1s ease 0.6s both;
                }
                .feature-card {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                .feature-card:hover {
                    transform: translateY(-8px);
                    box-shadow: 0 20px 60px rgba(200, 155, 60, 0.2);
                }
                .hex-bg {
                    background-image: radial-gradient(circle at 1px 1px, rgba(200, 155, 60, 0.15) 1px, transparent 0);
                    background-size: 40px 40px;
                }
                .nav-link {
                    transition: color 0.2s ease;
                }
                .nav-link:hover {
                    color: #C89B3C;
                }
                .glow-orb {
                    animation: glow 3s ease-in-out infinite;
                }
                .stat-card {
                    transition: transform 0.2s ease;
                }
                .stat-card:hover {
                    transform: scale(1.05)
                }
                .cta-primary {
                    background: linear-gradient(135deg, #C89B3C 0%, #785A28 100%);
                    color: white;
                    padding: 1rem 2.5rem;
                    border-radius: 4px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.1rem;
                    letter-spacing: 0.1em;
                    text-transform: uppercase;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    display: inline-block;
                }
                .cta-primary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(200, 155, 60, 0.4);
                }
                .cta-secondary {
                    background: transparent;
                    color: #C89B3C;
                    padding: 1rem 2.5rem;
                    border-radius: 4px;
                    text-decoration: none;
                    font-weight: 700;
                    font-size: 1.1rem;
                    letter-spacing: 0.1rem;
                    text-transform: uppercase;
                    border: 1px solid rgba(200, 155, 60, 0.4);
                    transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
                    display: inline-block;
                }
                .cta-secondary:hover {
                    transform: translateY(-3px);
                    border-color: #C89B3C;
                    box-shadow: 0 10px 30px rgba(200, 155, 60, 0.15);
                }
                .cta-tertiary {
                    background: linear-gradient(135deg, #C89B3C 0%, #785A28 100%);
                    color: white;
                    padding: '1rem 2.5rem',
                    border-radius: '8px',
                    text-decoration: 'none',
                    font-weight: 700,
                    letter-spacing: '0.05em'
                    text-transform: uppercase;
                    transition: transform 0.2s ease, box-shadow 0.2s ease;
                    display: inline-block;
                }
                .cta-tertiary:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(200, 155, 60, 0.4);
                }
            `}</style>

            {/* Navbar */}
            <nav style={{
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 100,
                padding: '1.2rem 3rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: scrollY > 50 ? 'rgba(10, 10, 15, 0.95)' : 'transparent',
                backdropFilter: scrollY > 50 ? 'blur(10px)' : 'none',
                borderBottom: scrollY > 50 ? '1px solid rgba(200, 155, 60, 0.2' : 'none',
                transition: 'all 0.3s ease'
            }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.4rem', fontWeight: 700, color: '#C89B3C', letterSpacing: '0.15em' }}>RIFT & RIFLE</span>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <a href="/login" className="nav-link" style={{ color: '#a0a0b0', textDecoration: 'none', fontWeight: 600, letterSpacing: '0.1em' }}>LOGIN</a>
                    <a href="/register" style={{
                        background: 'linear-gradient(135deg, #C89B3C, #785A28)',
                        color: 'white',
                        padding: '0.5rem 1.5rem',
                        borderRadius: '4px',
                        textDecoration: 'none',
                        fontWeight: 600,
                        letterSpacing: '0.05em'
                    }}>GET STARTED</a>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="hex-bg" style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                padding: '8rem 2rem 4rem'
            }}>
                {/* Glow orbs */}
                <div className="glow-orb" style={{
                    position: 'absolute',
                    top: '20%',
                    left: '10%',
                    width: '400px',
                    height: '400px',
                    background: 'radial-gradient(circle, rgba(200, 155, 60, 0.15) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none'
                }} />
                <div className="glow-orb" style={{
                    position: 'absolute',
                    bottom: '20%',
                    right: '10%',
                    width: '500px',
                    height: '500px',
                    background: 'radial-gradient(circle, rgba(88, 101, 242, 0.1) 0%, transparent 70%)',
                    borderRadius: '50%',
                    pointerEvents: 'none',
                    animationDelay: '1.5s'
                }} />

                <div style={{ textAlign: 'center', maxWidth: '900px', position: 'relative', zIndex: 1 }}>
                    <p style={{ color: '#C89B3C', letterSpacing: '0.3em', fontSize: '1.2rem', fontWeight: 700, marginBottom: '1.5rem', textTransform: 'uppercase' }}>League of Legends · Counter-Strike 2</p>
                    <h1 className="hero-title">TWO GAMES</h1>
                    <div style={{ width: '720px', height: '2px', background: 'linear-gradient(90deg, transparent, #C89B3C, transparent)', margin: '0.5rem auto' }} />
                    <h1 className="hero-title">ONE HUB</h1>
                    <p className="subtitle" style={{ fontSize: '1.3rem', color: 'a0a0b0', maxWidth: '600px', margin: '1.5rem auto 2.5rem', lineHeight: 1.6, fontWeight: 500}}>
                        Track your stats, analyze your performance, and climb the ranks across League of Legends and Counter-Strike 2 with real-time data.
                    </p>

                    <div className="cta-buttons" style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <a href="/register" className="cta-primary">Start Tracking</a>
                        <a href="/login" className="cta-secondary">Login</a>
                    </div>
                </div>
            </section>

            {/* Stats Bar */}
            <section style={{
                background: 'linear-gradient(90deg, rgba(200, 155, 60, 0.1) 0%, rgba(88, 101, 242, 0.1) 100%',
                borderTop: '1px solid rgba(200, 155, 60, 0.2)',
                borderBottom: '1px solid rgba(200, 155, 60, 0.2)',
                padding: '2rem 3rem',
                display: 'flex',
                justifyContent: 'space-around',
                flexWrap: 'wrap',
                gap: '2rem'
            }}>
                {[
                    { value: 'LIVE', label: 'Match Data' },
                    { value: 'RANK', label: 'Tracking' },
                    { value: 'TOP 10', label: 'Champions' },
                    { value: 'KDA', label: 'Analytics' }
                ].map((stat) => (
                    <div key={stat.label} className="stat-card" style={{ textAlign: 'center' }}>
                        <p style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2rem', fontWeight: 700, color: '#C89B3C', margin: 0 }}>{stat.value}</p>
                        <p style={{ color: '#a0a0b0', fontSize: '1rem', fontWeight: 700, letterSpacing: '0.10em', textTransform: 'uppercase', margin: '0.3rem 0 0' }}>{stat.label}</p>
                    </div>
                ))}
            </section>

            {/* Features Section */}
            <section style={{ padding: '6rem 3rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', textAlign: 'center', color: '#F0E6D3', marginBottom: '1rem' }}>Everything You Need</h2>
                <p style={{ textAlign: 'center', color: '#a0a0b0', marginBottom: '4rem', fontSize: '1.2rem', fontWeight: 500, letterSpacing: '0.02rem'}}>All your League stats in one beautiful dashboard</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'react(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
                    {[
                        { icon: '🏆', title: 'Rank Tracking', desc: 'Solo/Duo and Flex rankings with LP and win rate breakdown', color: '#C89B3C' },
                        { icon: '⚔️', title: 'Match History', desc: 'Detailed match breakdowns with KDA, CS, vision score and more', color: '#5865F2' },
                        { icon: '🎯', title: 'Champion "Mastery', desc: 'Your top champions with mastery points and performance stats', color: '#ff4757' },
                        { icon: '🔴', title: 'Live Game', desc: 'See when your friends are in a game and track it in real time', color: '#ff4757' }
                    ].map((feature) => (
                        <div key={feature.title} className="feature-card" style={{
                            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.03) 0%, rgba(255, 255, 255, 0.01) 100%',
                            border: '1px solid rgba(255, 255, 255, 0.08)',
                            borderRadius: '12px',
                            padding: '2rem',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: feature.color
                            }} />
                            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{feature.icon}</div>
                            <h3 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '1.5rem', color: '#F0E6D3', marginBottom: '0.75rem', letterSpacing: '0.02rem' }}>{feature.title}</h3>
                            <p style={{ color: '#a0a0b0', lineHeight: 1.6, fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.02rem' }}>{feature.desc}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '6rem 3rem',
                textAlign: 'center',
                background: 'linear-gradient(135deg, rgba(200, 155, 60, 0.05) 0%, rgba(88, 101, 242, 0.05) 100%)',
                borderTop: '1px solid rgba(200, 155, 60, 0.15)'
            }}>
                <h2 style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '2.5rem', color: '#F0E6D3', marginBottom: '1rem' }}>Ready to Climb?</h2>
                <p style={{ color: 'a0a0b0', fontSize: '1.1rem', marginBottom: '2.5rem', letterSpacing: '0.02rem', fontWeight: 500 }}>Create your free account and start tracking today.</p>
                <a href="/register" className="cta-primary">Create Free Account</a>
            </section>

            {/* Footer */}
            <footer style={{
                padding: '2rem 3rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '1rem'
            }}>
                <span style={{ fontFamily: 'Bebas Neue, sans-serif', color: '#C89B3C', fontWeight: 700, letterSpacing: '0.05rem', fontSize: '1.5rem'}}>RIFT & RIFLE</span>
                <p style={{ color: '#555', fontSize: '0.9rem', margin: 0, fontWeight: '600', letterSpacing: '0.001rem' }}>Not affiliated with Riot Games. All game data provided by Riot Games API.</p>
            </footer>
        </div>
    )
}

export default Landing