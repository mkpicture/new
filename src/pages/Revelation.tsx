import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import ParticleBackground from '@/components/ParticleBackground';
import AudioPlayer from '@/components/AudioPlayer';
import { Heart, RotateCcw } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const Revelation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [stage, setStage] = useState(0);
  const personName = (location.state as { personName?: string })?.personName || 'Cher(e) joueur(se)';
  const audioUrl = (location.state as { audioUrl?: string })?.audioUrl || encodeURI('/Messages audios/Intro code.m4a');

  useEffect(() => {
    // Progressive reveal stages
    const timers = [
      setTimeout(() => setStage(1), 500),
      setTimeout(() => setStage(2), 2000),
      setTimeout(() => setStage(3), 4000),
      setTimeout(() => setStage(4), 6000),
    ];

    return () => timers.forEach(clearTimeout);
  }, []);

  const handleRestart = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-midnight-gradient relative overflow-hidden">
      <ParticleBackground />
      
      {/* Enhanced ambient effects for celebration */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-glow-overlay opacity-60 animate-breathe" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] bg-violet/20 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-gold/10 rounded-full blur-3xl animate-float delay-1000" />

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 py-12">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          
          {/* Success icon */}
          <div className={`transition-all duration-1000 ${stage >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}>
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gold/20 border border-gold/40 animate-pulse-glow">
              <Heart className="h-12 w-12 text-gold animate-float" fill="currentColor" />
            </div>
          </div>

          {/* Main title */}
          <div className={`transition-all duration-1000 delay-500 ${stage >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="font-display text-5xl md:text-7xl font-light text-gradient-gold animate-text-reveal">
              Bravo {personName} !
            </h1>
          </div>

          {/* Decorative line */}
          <div className={`flex justify-center transition-all duration-1000 ${stage >= 2 ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`}>
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          {/* Revelation message */}
          <div className={`space-y-6 transition-all duration-1000 ${stage >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <p className="text-xl md:text-2xl text-foreground font-display font-light leading-relaxed">
              Tu as trouvé le secret, {personName} !
            </p>
            <p className="text-lg text-foreground/80 font-light leading-relaxed">
              Derrière chaque énigme se cache une vérité,<br />
              et cette vérité t'était destinée.
            </p>
          </div>

          {/* Audio Player for the personal message */}
          <div className={`transition-all duration-1000 ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="max-w-md mx-auto">
              <AudioPlayer
                src={audioUrl}
                title={`🎵 Message audio pour ${personName}`}
                autoPlay={stage >= 4}
              />
            </div>
          </div>

          {/* Personal message box */}
          <div className={`transition-all duration-1000 ${stage >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="glass-card rounded-2xl p-8 border border-gold/30 glow-gold">
              <p className="text-lg md:text-xl text-foreground font-display italic leading-relaxed">
                "Ce message est pour toi, et toi seul(e).<br />
                Tu es unique, précieux(se), et cette expérience<br />
                a été créée avec tout l'amour du monde."
              </p>
              <div className="mt-6 flex justify-center">
                <span className="text-gold text-2xl">✨ 💫 ✨</span>
              </div>
            </div>
          </div>

          {/* Final message */}
          <div className={`space-y-6 pt-8 transition-all duration-1000 ${stage >= 4 ? 'opacity-100' : 'opacity-0'}`}>
            <p className="text-muted-foreground text-sm">
              Merci d'avoir joué le jeu jusqu'au bout.
            </p>
            
            <Button
              variant="ethereal"
              size="lg"
              onClick={handleRestart}
              className="font-display tracking-wide"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Revivre l'expérience
            </Button>
          </div>
        </div>
      </div>

      {/* Celebration particles effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {stage >= 1 && (
          <>
            {[...Array(20)].map((_, i) => (
              <div
                key={i}
                className="absolute w-2 h-2 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  backgroundColor: i % 2 === 0 ? 'hsl(45 80% 65% / 0.6)' : 'hsl(280 40% 60% / 0.4)',
                  animationDelay: `${Math.random() * 3}s`,
                  animationDuration: `${4 + Math.random() * 4}s`,
                }}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Revelation;
