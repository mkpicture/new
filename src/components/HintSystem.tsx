import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

interface HintSystemProps {
  inputValue: string;
  attempts: number;
}

interface Hint {
  id: string;
  trigger: string[];
  message: string;
  revealed: boolean;
}

const HINTS: Hint[] = [
  {
    id: 'hint-1',
    trigger: ['amour', 'coeur', 'love'],
    message: "L'amour éclaire même les nuits les plus sombres...",
    revealed: false,
  },
  {
    id: 'hint-2',
    trigger: ['souvenir', 'mémoire', 'passé'],
    message: 'Les souvenirs sont les clés qui ouvrent les portes du temps.',
    revealed: false,
  },
  {
    id: 'hint-3',
    trigger: ['lumière', 'étoile', 'brillant'],
    message: 'Cherche la lumière là où tu ne l\'attends pas.',
    revealed: false,
  },
  {
    id: 'hint-4',
    trigger: ['secret', 'mystère', 'caché'],
    message: 'Certains secrets ne se révèlent qu\'à ceux qui savent écouter.',
    revealed: false,
  },
  {
    id: 'hint-5',
    trigger: ['temps', 'moment', 'instant'],
    message: 'Le temps est un cercle, pas une ligne droite.',
    revealed: false,
  },
];

const HintSystem = ({ inputValue, attempts }: HintSystemProps) => {
  const [revealedHints, setRevealedHints] = useState<Set<string>>(new Set());
  const [activeHint, setActiveHint] = useState<string | null>(null);
  const [attemptsHint, setAttemptsHint] = useState<string | null>(null);

  // Check for keyword triggers
  useEffect(() => {
    const lowerInput = inputValue.toLowerCase().trim();
    
    HINTS.forEach((hint) => {
      if (hint.trigger.some((trigger) => lowerInput.includes(trigger))) {
        if (!revealedHints.has(hint.id)) {
          setRevealedHints((prev) => new Set([...prev, hint.id]));
          setActiveHint(hint.message);
          
          // Clear active hint after display
          setTimeout(() => setActiveHint(null), 5000);
        }
      }
    });
  }, [inputValue, revealedHints]);

  // Show hints based on attempts
  useEffect(() => {
    if (attempts === 2) {
      setAttemptsHint('Écoute attentivement... les réponses sont dans le son.');
    } else if (attempts === 3) {
      setAttemptsHint('Le prénom et le code sont liés par une histoire.');
    } else if (attempts >= 4) {
      setAttemptsHint('Pense à ce qui est le plus précieux, le plus intime...');
    }
  }, [attempts]);

  const allHints = [...Array.from(revealedHints)].map((id) => 
    HINTS.find((h) => h.id === id)
  ).filter(Boolean);

  return (
    <div className="space-y-4">
      {/* Active hint notification */}
      {activeHint && (
        <div className="animate-fade-in-up glass-card rounded-lg p-4 border border-gold/30">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-gold mt-0.5 animate-pulse" />
            <p className="text-sm text-ethereal italic font-display">
              {activeHint}
            </p>
          </div>
        </div>
      )}

      {/* Attempts-based hint */}
      {attemptsHint && !activeHint && (
        <div className="animate-fade-in glass-card rounded-lg p-4 border border-violet/30">
          <p className="text-sm text-muted-foreground italic text-center">
            💡 {attemptsHint}
          </p>
        </div>
      )}

      {/* Revealed hints counter */}
      {allHints.length > 0 && (
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            {allHints.length} indice{allHints.length > 1 ? 's' : ''} découvert{allHints.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default HintSystem;
