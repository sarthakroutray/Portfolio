import Hero from './components/Hero';

function Home() {
  return (
    <div className='relative w-full h-screen'>
      {/* Desktop: Hero Pattern */}
      <div className='absolute inset-0 bg-hero-pattern bg-cover bg-no-repeat bg-center opacity-50 pointer-events-none hidden md:block' />
      
      {/* Mobile: Dark Gradient */}
      <div 
        className='absolute inset-0 md:hidden' 
        style={{
          background: 'linear-gradient(135deg, #0a0e27 0%, #1a1a3e 50%, #0d0d1f 100%)',
          opacity: 0.5
        }}
      />
      
      <Hero />
    </div>
  );
}

export default Home; 
