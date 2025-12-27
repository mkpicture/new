import { useState, useEffect, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AudioPlayer from '@/components/AudioPlayer';
import HintSystem from '@/components/HintSystem';
import ParticleBackground from '@/components/ParticleBackground';
import { ArrowLeft, Lock, Unlock } from 'lucide-react';

// Configuration - Liste des prénoms et codes secrets
interface PersonEntry {
  name: string;
  code: string;
  audio?: string; // URL du fichier audio (optionnel) - ex: '/Messages audios/carine.m4a'
}

// Fonction pour générer le chemin audio à partir du nom
// Les fichiers sont dans le dossier public/Messages audios/
// Utilise encodeURI pour gérer correctement les espaces et caractères spéciaux dans les URLs
const getAudioPath = (personName: string): string => {
  // Mapping des noms de personnes vers les noms de fichiers audio
  const audioFileMapping: Record<string, string> = {
    'Bob Moukila': 'Bob Moukila.m4a',
    'Carine': 'Carine.m4a',
    'Delyvrence': 'Maman Dely.m4a',
    'Andrea': 'Andrea.m4a',
    'Axelle': 'Axelle.m4a',
    'Desire': 'Désiré.m4a',
    'Gildarine': 'Gildarine.m4a',
    'Dalie': 'Dalie.m4a',
    'Maison blanche': 'Maison blanche.m4a',
    'Fenela': 'Fenela.m4a',
    'Stephane': 'Stéphane.m4a',
    'Izoua Gang': '', // Pas de fichier trouvé
    'Desir': 'Désir.m4a',
    'Gloire': 'Gloire.m4a',
    'Aude': 'Aude.m4a',
    'Elie': 'Elie.m4a',
    'Dorcas': 'Dorcas.m4a',
    'Mullan': 'Mullan.m4a',
    'Ma cha': 'Ma cha.m4a',
    'Bonnie': 'Bonnie.m4a',
    'Havila': 'Havila.m4a',
    'Cohenn': 'Cohenn.m4a',
    'Julie Marcelle': '', // Pas de fichier trouvé
    'Amy': 'Amy.m4a',
    'Ashnath': 'Asnath.m4a',
    'Tantine Claudia': 'Tantine Claudia.m4a',
    'Christ YP': 'Diacre Christ.m4a',
    'Ashley Sala': 'Ashley Sala.m4a',
    'Chimelda': 'Chimelda.m4a',
    'Marlyne': 'Marlyne.m4a',
    'Adoree': 'Adorée.m4a',
    'Celia': 'Celia.m4a',
    'Darick': 'Darrick.m4a',
    'Grace': 'Grâce.m4a',
    'Mervie': 'Mervie.m4a',
    'Cousins': 'Cousins.m4a',
    'Billard': 'Billard.m4a',
    'Michela': 'Michela.m4a',
    'Brahan': 'Brahan.m4a',
    'Engel': 'Engel.m4a',
    'Jorianne': 'Jorianne.m4a',
    'Edwin': 'Tonton Edwin.m4a',
  };

  const fileName = audioFileMapping[personName];
  if (!fileName) {
    return ''; // Pas de fichier audio pour cette personne
  }
  // Encoder l'URL pour gérer correctement les espaces et caractères spéciaux
  const path = `/Messages audios/${fileName}`;
  return encodeURI(path);
};
// Génération de la liste avec les chemins audio automatiques
const PEOPLE: PersonEntry[] = [
  { name: 'Bob Moukila', code: 'Jeep', audio: getAudioPath('Bob Moukila') },
  { name: 'Carine', code: 'Mon amour', audio: getAudioPath('Carine') },
  { name: 'Delyvrence', code: 'Cagil James', audio: getAudioPath('Delyvrence') },
  { name: 'Andrea', code: 'Panda', audio: getAudioPath('Andrea') },
  { name: 'Axelle', code: 'Mlle Mavikana', audio: getAudioPath('Axelle') },
  { name: 'Desire', code: 'Tchipi', audio: getAudioPath('Desire') },
  { name: 'Gildarine', code: 'La nga', audio: getAudioPath('Gildarine') },
  { name: 'Dalie', code: 'Donnez moi les cadeaux', audio: getAudioPath('Dalie') },
  { name: 'Maison blanche', code: 'Les poils', audio: getAudioPath('Maison blanche') },
  { name: 'Fenela', code: 'Babe', audio: getAudioPath('Fenela') },
  { name: 'Stephane', code: '2k24', audio: getAudioPath('Stephane') },
  { name: 'Izoua Gang', code: 'Pizza', audio: getAudioPath('Izoua Gang') },
  { name: 'Desir', code: 'Moureri', audio: getAudioPath('Desir') },
  { name: 'Gloire', code: 'Les Glorieux', audio: getAudioPath('Gloire') },
  { name: 'Aude', code: 'Mon Frere', audio: getAudioPath('Aude') },
  { name: 'Elie', code: 'Cybersecurity', audio: getAudioPath('Elie') },
  { name: 'Dorcas', code: 'Ma RH', audio: getAudioPath('Dorcas') },
  { name: 'Mullan', code: 'Realisateur', audio: getAudioPath('Mullan') },
  { name: 'Ma cha', code: 'Cazouzou', audio: getAudioPath('Ma cha') },
  { name: 'Bonnie', code: 'Clyde', audio: getAudioPath('Bonnie') },
  { name: 'Havila', code: 'Kepi a la manière', audio: getAudioPath('Havila') },
  { name: 'Cohenn', code: 'Politicien', audio: getAudioPath('Cohenn') },
  { name: 'Julie Marcelle', code: 'Chien', audio: getAudioPath('Julie Marcelle') },
  { name: 'Amy', code: 'Golden girl from togo', audio: getAudioPath('Amy') },
  { name: 'Ashnath', code: 'La belge', audio: getAudioPath('Ashnath') },
  { name: 'Tantine Claudia', code: 'Bisou mon fils', audio: getAudioPath('Tantine Claudia') },
  { name: 'Christ YP', code: 'Le KG', audio: getAudioPath('Christ YP') },
  { name: 'Ashley Sala', code: 'Je cherche mon gain', audio: getAudioPath('Ashley Sala') },
  { name: 'Chimelda', code: 'Prends tes responsabilites', audio: getAudioPath('Chimelda') },
  { name: 'Marlyne', code: 'Papa', audio: getAudioPath('Marlyne') },
  { name: 'Adoree', code: 'Mon 1m88', audio: getAudioPath('Adoree') },
  { name: 'Celia', code: 'Mannequin', audio: getAudioPath('Celia') },
  { name: 'Darick', code: 'Mynigga', audio: getAudioPath('Darick') },
  { name: 'Grace', code: 'Sister', audio: getAudioPath('Grace') },
  { name: 'Mervie', code: 'Regab', audio: getAudioPath('Mervie') },
  { name: 'Cousins', code: 'Essomeyo Charlotte', audio: getAudioPath('Cousins') },
  { name: 'Billard', code: 'Billard', audio: getAudioPath('Billard') },
  { name: 'Michela', code: 'Tayc', audio: getAudioPath('Michela') },
  { name: 'Brahan', code: 'Tory lanez', audio: getAudioPath('Brahan') },
  { name: 'Engel', code: 'Breezy', audio: getAudioPath('Engel') },
  { name: 'Jorianne', code: 'Anais', audio: getAudioPath('Jorianne') },
  { name: 'Edwin', code: 'Jazz', audio: getAudioPath('Edwin') },
];

// Fonction pour normaliser les chaînes (enlever accents, espaces, minuscules)
const normalizeString = (str: string): string => {
  return str
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
    .replace(/\s+/g, ' ') // Normaliser les espaces
    .trim();
};

// Fonction pour vérifier si un code correspond (exact ou partiel par mots)
const codeMatches = (enteredCode: string, expectedCode: string): boolean => {
  const normalizedEntered = normalizeString(enteredCode);
  const normalizedExpected = normalizeString(expectedCode);

  // Correspondance exacte
  if (normalizedEntered === normalizedExpected) {
    return true;
  }

  // Pour les codes à plusieurs mots : si au moins un mot correspond, c'est valide
  const expectedWords = normalizedExpected.split(/\s+/).filter(w => w.length > 0);
  const enteredWords = normalizedEntered.split(/\s+/).filter(w => w.length > 0);

  // Si le code attendu a plusieurs mots, vérifier qu'au moins un mot correspond
  if (expectedWords.length > 1) {
    return enteredWords.some(enteredWord => 
      expectedWords.some(expectedWord => enteredWord === expectedWord)
    );
  }

  // Pour un seul mot, correspondance exacte requise
  return false;
};

// Fonction pour vérifier si un prénom et un code correspondent
const isValidCombination = (name: string, code: string): boolean => {
  const normalizedName = normalizeString(name);

  return PEOPLE.some(person => {
    const normalizedPersonName = normalizeString(person.name);
    
    // Vérifier que le prénom correspond
    if (normalizedPersonName !== normalizedName) {
      return false;
    }

    // Vérifier que le code correspond (exact ou partiel)
    return codeMatches(code, person.code);
  });
};

const Game = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [message, setMessage] = useState<{ type: 'error' | 'hint' | 'success'; text: string } | null>(null);
  const [isShaking, setIsShaking] = useState(false);
  const [showContent, setShowContent] = useState(false);
  const [currentAudio, setCurrentAudio] = useState<string>(encodeURI('/Messages audios/Intro code.m4a'));
  const [currentPerson, setCurrentPerson] = useState<PersonEntry | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Mettre à jour l'audio quand le prénom ou le code change
  useEffect(() => {
    const normalizedName = normalizeString(name);
    const normalizedCode = normalizeString(code);

    if (!normalizedName) {
      setCurrentPerson(null);
      setCurrentAudio(encodeURI('/Messages audios/Intro code.m4a'));
      return;
    }

    const person = PEOPLE.find(p => {
      const normalizedPersonName = normalizeString(p.name);
      if (normalizedPersonName !== normalizedName) {
        return false;
      }

      // Si un code est entré, vérifier la correspondance
      if (normalizedCode) {
        return codeMatches(normalizedCode, p.code);
      }

      // Si pas de code entré, vérifier si le code de la personne est vide
      return normalizeString(p.code) === '';
    });

    if (person) {
      setCurrentPerson(person);
      if (person.audio) {
        setCurrentAudio(person.audio);
      } else {
        // Si la personne existe mais n'a pas d'audio, utiliser l'audio par défaut
        setCurrentAudio(encodeURI('/Messages audios/Intro code.m4a'));
      }
    } else {
      setCurrentPerson(null);
      setCurrentAudio(encodeURI('/Messages audios/Intro code.m4a'));
    }
  }, [name, code]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const normalizedName = normalizeString(name);
    const normalizedCode = normalizeString(code);

    if (!normalizedName) {
      setMessage({ type: 'hint', text: 'Remplis le champ prénom pour continuer...' });
      return;
    }

    // Vérifier si le code est requis pour ce prénom
    const person = PEOPLE.find(p => normalizeString(p.name) === normalizedName);
    if (person && normalizeString(person.code) !== '' && !normalizedCode) {
      setMessage({ type: 'hint', text: 'Remplis le champ code pour continuer...' });
      return;
    }

    if (isValidCombination(normalizedName, normalizedCode)) {
      setMessage({ type: 'success', text: 'Le voile se lève...' });
      setTimeout(() => navigate('/revelation'), 1500);
    } else {
      setAttempts((prev) => prev + 1);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);

      // Dynamic error messages based on attempts
      const messages = [
        'Ce n\'est pas tout à fait ça... Écoute encore.',
        'Continue de chercher, la réponse est proche.',
        'Les indices sont là, dans chaque note...',
        'Prends ton temps, respire, et réessaie.',
        'Parfois, la réponse est plus simple qu\'on ne le pense.',
      ];
      
      setMessage({
        type: 'error',
        text: messages[Math.min(attempts, messages.length - 1)],
      });
    }
  };

  return (
    <div className="min-h-screen bg-midnight-gradient relative overflow-hidden">
      <ParticleBackground />
      
      {/* Ambient effects */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-glow-overlay opacity-30 animate-breathe" />
      <div className="absolute bottom-1/4 right-0 w-[300px] h-[300px] bg-violet/10 rounded-full blur-3xl animate-float" />

      {/* Header */}
      <header className="relative z-20 p-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Retour
        </Button>
      </header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 pb-12 min-h-[calc(100vh-100px)]">
        <div className={`max-w-lg w-full space-y-8 transition-all duration-700 ${showContent ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          
          {/* Title */}
          <div className="text-center space-y-2">
            <h1 className="font-display text-3xl md:text-4xl font-light text-gradient-gold">
              Trouve le Secret
            </h1>
            <p className="text-muted-foreground text-sm">
              Écoute, découvre, entre le code
            </p>
          </div>

          {/* Audio Player */}
          <div className="animate-fade-in delay-300">
            <AudioPlayer
              src={currentAudio}
              title={currentPerson ? `🎵 Message pour ${currentPerson.name}` : "🎵 Écoute attentivement..."}
            />
          </div>

          {/* Hint System */}
          <HintSystem inputValue={name + ' ' + code} attempts={attempts} />

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className={`space-y-4 ${isShaking ? 'animate-[shake_0.5s_ease-in-out]' : ''}`}>
              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-display tracking-wide">
                  Prénom secret
                </label>
                <Input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Quel prénom se cache dans les notes ?"
                  className="text-center font-display text-lg"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-muted-foreground font-display tracking-wide">
                  Code secret
                </label>
                <Input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="Le code qui ouvre la porte"
                  className="text-center font-display text-lg tracking-widest"
                />
              </div>
            </div>

            {/* Message display */}
            {message && (
              <div className={`animate-fade-in p-4 rounded-lg text-center ${
                message.type === 'error' ? 'bg-destructive/10 border border-destructive/30 text-destructive' :
                message.type === 'success' ? 'bg-gold/10 border border-gold/30 text-gold glow-gold' :
                'bg-muted border border-border text-muted-foreground'
              }`}>
                <p className="text-sm font-display">{message.text}</p>
              </div>
            )}

            {/* Submit button */}
            <Button
              type="submit"
              variant="mystical"
              size="lg"
              className="w-full font-display tracking-wide"
            >
              {attempts === 0 ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Vérifier
                </>
              ) : (
                <>
                  <Unlock className="h-4 w-4 mr-2" />
                  Réessayer
                </>
              )}
            </Button>
          </form>

          {/* Attempts counter */}
          {attempts > 0 && (
            <p className="text-center text-xs text-muted-foreground/50">
              Tentative{attempts > 1 ? 's' : ''} : {attempts}
            </p>
          )}
        </div>
      </main>

      {/* Custom shake animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
      `}</style>
    </div>
  );
};

export default Game;
