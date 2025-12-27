import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';

const Introduction = () => {
  const navigate = useNavigate();
  const [showContent, setShowContent] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Staggered reveal animations
    const contentTimer = setTimeout(() => setShowContent(true), 500);
    const buttonTimer = setTimeout(() => setShowButton(true), 2500);

    return () => {
      clearTimeout(contentTimer);
      clearTimeout(buttonTimer);
    };
  }, []);

  const handleStart = () => {
    navigate('/jeu');
  };

  return (
    <div className="min-h-screen bg-midnight-gradient relative overflow-hidden">
      <ParticleBackground />
      
      {/* Ambient glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-glow-overlay opacity-40 animate-breathe" />
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-violet/10 to-transparent" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          {/* Title */}
          <div className={`transition-all duration-1000 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-display text-5xl md:text-7xl font-light tracking-wide text-gradient-gold mb-4">
              Un Secret
            </h1>
            <h2 className="font-display text-3xl md:text-5xl font-light text-foreground/80 tracking-widest">
              t'attend
            </h2>
          </div>

          {/* Decorative line */}
          <div className={`flex justify-center transition-all duration-1000 delay-300 ${showContent ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
            <div className="w-32 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          {/* Narrative text */}
          <div className={`space-y-6 transition-all duration-1000 delay-500 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-lg md:text-xl text-foreground/70 font-light leading-relaxed">
              Quelque part, entre les notes d'une mélodie oubliée et les murmures du temps,
              se cache une vérité qui n'appartient qu'à toi.
            </p>
            <p className="text-base md:text-lg text-muted-foreground font-light leading-relaxed italic">
              Écoute. Ressens. Découvre.
            </p>
          </div>

          {/* Instructions */}
          <div className={`glass-card rounded-xl p-6 transition-all duration-1000 delay-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Pour révéler ce qui est caché, tu devras écouter attentivement,
              rassembler les indices, et trouver le <span className="text-gold">prénom</span> ainsi que le <span className="text-gold">code secret</span>.
            </p>
          </div>

          {/* CTA Button */}
          <div className={`pt-8 transition-all duration-1000 ${showButton ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <Button
              variant="golden"
              size="xl"
              onClick={handleStart}
              className="font-display text-lg tracking-wide"
            >
              Commencer l'expérience
            </Button>
          </div>

          {/* Subtle hint */}
          <p className={`text-xs text-muted-foreground/50 transition-all duration-1000 delay-1000 ${showButton ? 'opacity-100' : 'opacity-0'}`}>
            🎧 Prépare tes écouteurs pour une meilleure immersion
          </p>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};

export default Introduction;
