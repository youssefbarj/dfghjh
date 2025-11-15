"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { RotateCcw, ChevronLeft, ChevronRight, Clock, CheckCircle, Trophy, Star, Sparkles, Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface TreatmentStep {
  id: number
  title: string
  duration: string
  image: string
  video?: string // Added optional video property
  illustration?: string // Added optional illustration property
  description: string
  benefits: string[]
}

const treatmentSteps: TreatmentStep[] = [
  {
    id: 1,
    title: "Marquage des colonnes philtrales",
    duration: "45s",
    image: "/images/step 1.png",
    video: "/videos/step 1.mov",
    illustration: "/illustrations/step 1.png",
    description: "Avec des mains gantées, utilisez un crayon cosmétique pour dessiner des lignes verticales parallèles le long des crêtes du philtrum (la zone entre le nez et la lèvre supérieure). Cette étape initiale est cruciale pour établir les points de repère centraux qui garantiront la symétrie de l'arc de Cupidon.",
    benefits: ["Points de repère centraux", "Symétrie garantie", "Base précise"],
  },
  {
    id: 2,
    title: "Définition de l'arc de Cupidon",
    duration: "30s",
    image: "/images/step 2.png",
    video: "/videos/step 2.mov",
    illustration: "/illustrations/step 2.png",
    description: "En vous basant sur les lignes directrices tracées à l'étape précédente, dessinez la forme en 'V' de l'arc de Cupidon. La précision de cette étape définit le point central et le plus proéminent de la lèvre supérieure. Assurez-vous d'obtenir des courbes nettes et symétriques.",
    benefits: ["Forme en V précise", "Courbes symétriques", "Point central défini"],
  },
  {
    id: 3,
    title: "Traçage du contour de la lèvre supérieure",
    duration: "40s",
    image: "/images/step 3.png",
    video: "/videos/step 3.mov",
    illustration: "/illustrations/step 3.png",
    description: "Continuez à dessiner le contour de la lèvre supérieure en partant des pointes de l'arc de Cupidon jusqu'aux commissures des lèvres. Maintenez une pression constante sur le crayon pour une ligne uniforme et claire. Ce tracé servira de guide précis pour la pigmentation.",
    benefits: ["Ligne uniforme", "Guide précis", "Contour défini"],
  },
  {
    id: 4,
    title: "Traçage du contour de la lèvre inférieure",
    duration: "40s",
    image: "/images/step 4.jpeg",
    illustration: "/illustrations/step 4.png",
    description: "Dessinez le contour de la lèvre inférieure en veillant à créer une forme équilibrée et harmonieuse par rapport à la lèvre supérieure. L'objectif est de définir une forme de lèvres pleine et symétrique qui respecte la morphologie du mannequin.",
    benefits: ["Forme équilibrée", "Symétrie parfaite", "Harmonie générale"],
  },
  {
    id: 5,
    title: "Vérification du tracé final",
    duration: "1min",
    image: "/images/step 5.jpeg",
    illustration: "/illustrations/step 5.png",
    description: "Examinez attentivement le contour complet des lèvres. Prenez du recul pour évaluer la symétrie générale, l'équilibre et les proportions. C'est la dernière opportunité de faire des ajustements au crayon avant de commencer la procédure de pigmentation.",
    benefits: ["Symétrie vérifiée", "Proportions correctes", "Ajustements possibles"],
  },
  {
    id: 6,
    title: "Déballage de la cartouche d'aiguille stérile",
    duration: "15s",
    image: "/images/step 6.png",
    video: "/videos/step 6.mov",
    illustration: "/illustrations/step 6.png",
    description: "Ouvrez l'emballage d'une cartouche d'aiguille à usage unique. Il est impératif de vérifier que l'emballage est bien scellé et que la date de péremption n'est pas dépassée. La manipulation de tout équipement stérile doit toujours se faire avec des gants pour maintenir l'asepsie.",
    benefits: ["Stérilité assurée", "Sécurité garantie", "Équipement vérifié"],
  },
  {
    id: 7,
    title: "Insertion de la cartouche dans le dermographe",
    duration: "20s",
    image: "/images/step 7.png",
    video: "/videos/step 7.mov",
    illustration: "/illustrations/step 7.png",
    description: "Insérez la cartouche d'aiguille dans le dermographe (la machine de maquillage permanent). Assurez-vous qu'elle est correctement enclenchée, généralement par un mécanisme de rotation ou de 'clic', pour garantir qu'elle ne bougera pas pendant la procédure.",
    benefits: ["Fixation sécurisée", "Stabilité assurée", "Mécanisme vérifié"],
  },
  {
    id: 8,
    title: "Ajustement de la sortie de l'aiguille",
    duration: "15s",
    image: "/images/step 8.png",
    video: "/videos/step 8.mov",
    illustration: "/illustrations/step 8.png",
    description: "Réglez la profondeur de l'aiguille en tournant la bague d'ajustement du dermographe. La longueur de l'aiguille qui sort de la cartouche doit être adaptée à la technique de lip blush et à la zone à pigmenter. Un réglage correct est essentiel pour déposer le pigment à la bonne profondeur dans le derme.",
    benefits: ["Profondeur optimale", "Technique adaptée", "Dépôt précis"],
  },
  {
    id: 9,
    title: "Test du dermographe et du mouvement de l'aiguille",
    duration: "20s",
    image: "/images/step 9.jpeg",
    illustration: "/illustrations/step 9.png",
    description: "Allumez le dermographe pour vérifier que l'aiguille se déplace de manière fluide et constante. Cette vérification rapide permet de s'assurer que l'appareil fonctionne correctement avant de le charger en pigment et de commencer à travailler.",
    benefits: ["Mouvement fluide", "Fonctionnement vérifié", "Performance optimale"],
  },
  {
    id: 10,
    title: "Chargement du pigment sur l'aiguille",
    duration: "15s",
    image: "/images/step 10.jpeg",
    illustration: "/illustrations/step 10.png",
    description: "Trempez la pointe de la cartouche, avec l'aiguille en mouvement, dans une bague à pigment remplie de la couleur choisie. Laissez la cartouche aspirer une petite quantité de pigment. Évitez de surcharger la cartouche pour permettre une application propre et contrôlée.",
    benefits: ["Chargement optimal", "Application contrôlée", "Couleur uniforme"],
  },
  {
    id: 11,
    title: "Pigmentation du contour des lèvres",
    duration: "1min 15s",
    image: "/images/step 11.png",
    video: "/videos/step 11.mov",
    illustration: "/illustrations/step 11.png",
    description: "Commencez la pigmentation en suivant méticuleusement le tracé au crayon. Tenez le dermographe à un angle d'environ 90 degrés par rapport à la surface du silicone. Utilisez votre autre main pour étirer légèrement la peau synthétique, ce qui permet une insertion plus douce de l'aiguille et une ligne plus nette. Avancez avec un mouvement lent et régulier pour créer une ligne de contour continue et bien définie.",
    benefits: ["Contour précis", "Ligne continue", "Définition nette"],
  },
  {
    id: 12,
    title: "Nettoyage et renforcement du contour",
    duration: "1min 50s",
    image: "/images/step 12.png",
    video: "/videos/step 12.mov",
    illustration: "/illustrations/step 12.png",
    description: "Après le premier passage, nettoyez délicatement la zone avec une lingette propre pour enlever l'excès de pigment et évaluer la saturation de la ligne. Appliquez une solution de soin ou un anesthésiant secondaire si nécessaire. Repassez sur le contour pour renforcer la couleur et assurer une définition parfaite avant de procéder au remplissage.",
    benefits: ["Saturation évaluée", "Couleur renforcée", "Définition parfaite"],
  },
  {
    id: 13,
    title: "Vérification du contour pigmenté",
    duration: "20s",
    image: "/images/step 13.png",
    video: "/videos/step 13.mov",
    illustration: "/illustrations/step 13.png",
    description: "Une fois le contour entièrement pigmenté et nettoyé, prenez un moment pour évaluer le résultat. Le contour doit être net, symétrique et uniforme. Cette étape de validation est essentielle avant de commencer la phase de remplissage (shading).",
    benefits: ["Contour net", "Symétrie validée", "Uniformité vérifiée"],
  },
  {
    id: 14,
    title: "Préparation du dermographe pour le remplissage",
    duration: "25s",
    image: "/images/step 14.png",
    video: "/videos/step 14.mov",
    illustration: "/illustrations/step 14.png",
    description: "Pour la phase de remplissage, une nouvelle cartouche d'aiguille stérile est souvent nécessaire (parfois d'une configuration différente de celle utilisée pour le contour). Répétez les étapes d'hygiène en ouvrant l'emballage stérile et en insérant fermement la nouvelle cartouche dans le dermographe.",
    benefits: ["Nouvelle cartouche", "Configuration adaptée", "Hygiène maintenue"],
  },
  {
    id: 15,
    title: "Initiation à la technique de pixellisation (Shading)",
    duration: "30s",
    image: "/images/step 15.png",
    video: "/videos/step 15.mov",
    illustration: "/illustrations/step 15.png",
    description: "Chargez la nouvelle aiguille en pigment. Commencez le remplissage en partant du contour et en allant vers l'intérieur de la lèvre. Utilisez un mouvement de balancier rapide et léger (pendulaire) pour déposer le pigment sous forme de petits points (pixels). Cette technique permet d'obtenir un effet poudré et naturel, évitant ainsi un aspect trop opaque.",
    benefits: ["Effet poudré", "Aspect naturel", "Technique pixellisée"],
  },
  {
    id: 16,
    title: "Remplissage de la lèvre par pixellisation",
    duration: "3min 30s",
    image: "/images/step 16.png",
    video: "/videos/step 16.mov",
    illustration: "/illustrations/step 16.png",
    description: "Continuez le mouvement de pixellisation sur toute la surface de la lèvre, en travaillant par petites sections. Superposez vos passages pour créer une couleur homogène et sans démarcation. La clé est la consistance du mouvement et de la pression pour garantir une saturation uniforme de la couleur.",
    benefits: ["Couleur homogène", "Saturation uniforme", "Mouvement constant"],
  },
  {
    id: 17,
    title: "Travail de précision sur les commissures",
    duration: "30s",
    image: "/images/step 17.png",
    video: "/videos/step 17.mov",
    illustration: "/illustrations/step 17.png",
    description: "Les commissures des lèvres sont des zones délicates. Adaptez l'angle de votre dermographe et l'orientation de vos mouvements pour pigmenter correctement ces zones arrondies. Une bonne technique d'étirement de la peau synthétique est particulièrement importante ici pour un résultat net.",
    benefits: ["Zones délicates", "Angle adapté", "Résultat net"],
  },
  {
    id: 18,
    title: "Superposition des couches pour la saturation de la couleur",
    duration: "3min 30s",
    image: "/images/step 18.png",
    video: "/videos/step 18.mov",
    illustration: "/illustrations/step 18.png",
    description: "Le lip blush se construit en plusieurs couches. Après un premier passage complet, nettoyez la lèvre et évaluez la couleur. Effectuez des passages supplémentaires pour intensifier la couleur jusqu'à obtenir la saturation désirée. Chaque couche ajoute de la profondeur et de la richesse au résultat final.",
    benefits: ["Couches multiples", "Profondeur créée", "Richesse de couleur"],
  },
  {
    id: 19,
    title: "Application du masque de pigment",
    duration: "15s",
    image: "/images/step 19.png",
    video: "/videos/step 19.mov",
    illustration: "/illustrations/step 19.png",
    description: "Une fois le remplissage terminé, appliquez une couche généreuse de pigment sur toute la surface des lèvres et laissez poser quelques minutes. Ce 'masque' permet au pigment de pénétrer davantage dans les micro-perforations, maximisant ainsi la rétention de la couleur.",
    benefits: ["Pénétration optimisée", "Rétention maximale", "Fixation du pigment"],
  },
  {
    id: 20,
    title: "Nettoyage final et révélation du résultat",
    duration: "20s",
    image: "/images/step 20.png",
    video: "/videos/step 20.mov",
    illustration: "/illustrations/step 20.png",
    description: "Après le temps de pose, retirez délicatement le masque de pigment avec une lingette propre et humide. Cette dernière étape révèle la couleur finale et la saturation obtenue. Le résultat doit être une couleur de lèvres uniforme et bien définie.",
    benefits: ["Couleur révélée", "Saturation finale", "Résultat uniforme"],
  },
  {
    id: 21,
    title: "Nettoyage approfondi de la zone de travail",
    duration: "30s",
    image: "/images/step 21.png",
    video: "/videos/step 21.mov",
    illustration: "/illustrations/step 21.png",
    description: "Utilisez une lingette propre, potentiellement imbibée d'une solution nettoyante douce, pour essuyer soigneusement toute la zone autour des lèvres. L'objectif est d'éliminer toute trace de pigment sur la peau en silicone afin d'isoler visuellement le travail effectué et d'apprécier la netteté du contour. Un travail propre est le reflet du professionnalisme.",
    benefits: ["Zone propre", "Contour isolé", "Professionnalisme"],
  },
  {
    id: 22,
    title: "Présentation finale du travail",
    duration: "20s",
    image: "/images/step 22.png",
    video: "/videos/step 22.mov",
    illustration: "/illustrations/step 22.png",
    description: "Effectuez un dernier passage délicat avec une lingette propre pour parfaire le nettoyage et vous assurer que la surface est impeccable. Cette étape finale met en valeur le résultat, en s'assurant qu'aucune particule ou résidu ne vienne distraire l'œil. Le travail est maintenant prêt à être photographié pour votre portfolio ou présenté pour évaluation.",
    benefits: ["Surface impeccable", "Résultat valorisé", "Prêt pour évaluation"],
  },
]

export default function LipBlushTreatmentGuide() {
  const [currentStep, setCurrentStep] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showCompletion, setShowCompletion] = useState(false)
  const [showMobileDetails, setShowMobileDetails] = useState(false)
  const [showFullScreenVideo, setShowFullScreenVideo] = useState(false)
  const [showFullScreenImage, setShowFullScreenImage] = useState(false)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            if (currentStep < treatmentSteps.length - 1) {
              setCurrentStep((prevStep) => prevStep + 1)
              return 0
            } else {
              setIsPlaying(false)
              setShowCompletion(true)
              return 100
            }
          }
          return prev + 2
        })
      }, 100)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentStep])

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleReset = () => {
    setIsPlaying(false)
    setCurrentStep(0)
    setProgress(0)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
    setShowFullScreenImage(false)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setProgress(0)
    setIsPlaying(false)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
    setShowFullScreenImage(false)
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
      setProgress(0)
      setIsPlaying(false)
      setShowCompletion(false)
      setShowMobileDetails(false)
      setShowFullScreenVideo(false)
      setShowFullScreenImage(false)
    }
  }

  const handleNext = () => {
    if (currentStep < treatmentSteps.length - 1) {
      setCurrentStep(currentStep + 1)
      setProgress(0)
      setIsPlaying(false)
      setShowCompletion(false)
      setShowMobileDetails(false)
      setShowFullScreenVideo(false)
      setShowFullScreenImage(false)
    }
  }

  const handleImageZoom = (imageSrc: string) => {
    setShowFullScreenImage(true)
  }

  const currentStepData = treatmentSteps[currentStep]

  const CompletionAnimation = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 bg-gradient-to-br from-blue-50 to-violet-100 rounded-2xl flex flex-col items-center justify-center z-10"
    >
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          initial={{
            opacity: 0,
            scale: 0,
            x: Math.random() * 400 - 200,
            y: Math.random() * 300 - 150,
          }}
          animate={{
            opacity: [0, 1, 0],
            scale: [0, 1, 0],
            y: [0, -50, -100],
          }}
          transition={{
            duration: 2,
            delay: i * 0.1,
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 3,
          }}
        >
          <Sparkles className="text-violet-400 w-4 h-4" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="mb-6"
      >
        <div className="relative">
          <Trophy className="w-20 h-20 text-violet-500" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
            className="absolute -top-2 -right-2"
          >
            <Star className="w-8 h-8 text-violet-400" />
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold font-saeada text-blue-900 mb-3">Félicitations !</h2>
        <p className="text-lg md:text-xl font-quicksand text-blue-800 mb-2">
          Formation Lip Blush terminée avec succès
        </p>
        <p className="text-base font-quicksand text-blue-700 mb-4">Toutes les étapes ont été complétées</p>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mx-4">
          <p className="text-sm font-quicksand text-gray-600 mb-1">Formation réalisée avec</p>
          <h3 className="text-xl font-bold font-saeada text-brand-gradient">Guide Professionnel Lip Blush</h3>
          <p className="text-xs font-quicksand text-gray-500 mt-1">Méthode certifiée • Mannequin silicone</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-2 md:gap-3 mt-6 flex-wrap justify-center"
      >
        <div className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          22/22 Étapes
        </div>
        <div className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          20 Minutes
        </div>
        <div className="bg-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Certifié
        </div>
        <div className="bg-pink-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Professionnel
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="mt-8"
      >
        <Button
          onClick={handleReset}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-bold rounded-full"
        >
          Recommencer
        </Button>
      </motion.div>
    </motion.div>
  )

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-4">
      <AnimatePresence>
        {showFullScreenVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black z-50 flex flex-col"
          >
            <div className="absolute top-4 left-4 z-10">
              <Button
                onClick={() => setShowFullScreenVideo(false)}
                className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full text-xs md:text-sm font-bold"
              >
                <ChevronLeft size={20} />
                Retour au guide
              </Button>
            </div>

            <div className="flex-1 flex items-center justify-center p-4">
              <div className="w-full max-w-6xl">
                <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
                  <iframe
                    src="https://player.vimeo.com/video/1115956913?badge=0&autopause=0&player_id=0&app_id=58479"
                    frameBorder="0"
                    allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
                    title="microblading_tutorial_for_beginners___e-lumy_digital_beauty_academy (1080p)"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-violet-50 p-4 border-b border-gray-100">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
              <h1 className="text-xl sm:text-2xl font-bold font-saeada text-gray-800">
                Entraînement Lip Blush
              </h1>
              <div className="flex flex-wrap gap-2 text-sm font-quicksand text-gray-600">
                <span>Pratique sur mannequin silicone</span>
                <span className="hidden sm:inline">•</span>
                <span>22 étapes essentielles</span>
                <span className="hidden sm:inline">•</span>
                <span>Technique professionnelle</span>
                <span className="hidden sm:inline">•</span>
                <span>Dermographe requis</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <span className="text-xl sm:text-2xl font-bold font-saeada text-gray-800">
                {currentStep + 1}/{treatmentSteps.length}
              </span>
              <div className="flex items-center gap-2 bg-gray-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full">
                <Clock size={14} className="sm:w-4 sm:h-4" />
                <span className="text-sm sm:text-base font-semibold font-quicksand text-gray-700">20min</span>
              </div>
            </div>
          </div>
        </div>

        {/* Important Notice Banner - Only show on first step */}
        {currentStep === 0 && (
          <div className="mx-2 md:mx-4 mb-4">
            <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <span className="text-amber-600 text-lg">⚠️</span>
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium text-amber-800">
                    <strong>Mannequin silicone avec lèvres requis</strong> - À acheter séparément
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    Cette formation lip blush nécessite un mannequin silicone avec zone labiale pour la pratique avant de travailler sur de vrais clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-quicksand text-gray-600">Progression de la formation Lip Blush</span>
            <span className="text-sm font-bold font-quicksand text-gray-800">
              {Math.round(((currentStep + 1) / treatmentSteps.length) * 100)}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-[#000435] to-[#CF9FFF] rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${((currentStep + 1) / treatmentSteps.length) * 100}%` }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            />
          </div>
        </div>

        {/* Navigation Controls - Above content for better UX */}
        <div className="px-2 md:px-4 py-3 bg-gradient-to-r from-blue-50 to-violet-50 border-b border-gray-100">
          {/* Top Row - Navigation Buttons */}
          <div className="flex justify-center items-center mb-3">
            <div className="flex items-center gap-2 sm:gap-3">
              <Button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                variant="outline"
                size="default"
                className="px-3 py-2 sm:px-4 sm:py-3 bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white border-none hover:from-[#000435]/90 hover:to-[#CF9FFF]/90 disabled:opacity-50 disabled:cursor-not-allowed font-quicksand text-sm sm:text-base shadow-lg disabled:opacity-30"
              >
                <ChevronLeft size={18} className="sm:w-5 sm:h-5" />
              </Button>

              <span className="text-sm font-semibold font-saeada text-gray-700 px-2 hidden sm:block">
                Étape {currentStep + 1} sur {treatmentSteps.length}
              </span>

              <Button
                onClick={handleNext}
                disabled={currentStep === treatmentSteps.length - 1}
                variant="outline"
                size="default"
                className="px-3 py-2 sm:px-4 sm:py-3 bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white border-none hover:from-[#000435]/90 hover:to-[#CF9FFF]/90 disabled:opacity-50 disabled:cursor-not-allowed font-quicksand text-sm sm:text-base shadow-lg disabled:opacity-30"
              >
                <ChevronRight size={18} className="sm:w-5 sm:h-5" />
              </Button>

              <Button
                onClick={handleReset}
                variant="outline"
                size="default"
                className="px-3 py-2 sm:px-4 sm:py-3 bg-white border-gray-300 hover:bg-gray-50 font-quicksand text-sm sm:text-base shadow-md"
              >
                <RotateCcw size={16} className="sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>

          {/* Bottom Row - Step Indicators */}
          <div className="flex justify-center">
            <div className="flex gap-1 md:gap-2 flex-wrap justify-center max-w-full">
              {treatmentSteps.map((step, index) => (
                <motion.button
                  key={step.id}
                  onClick={() => handleStepClick(index)}
                  className={`relative w-6 h-6 md:w-7 md:h-7 rounded-full transition-all duration-300 flex items-center justify-center text-xs font-bold font-quicksand flex-shrink-0 ${
                    index === currentStep
                      ? "bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white shadow-xl scale-110"
                      : index < currentStep
                        ? "bg-green-400 text-white shadow-lg"
                        : "bg-gray-200 text-gray-600 hover:bg-gray-300"
                  }`}
                  whileHover={{ scale: index === currentStep ? 1.1 : 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-xs">{index + 1}</span>

                  {/* Checkmark for Completed Steps */}
                  {index < currentStep && (
                    <motion.div
                      className="absolute -top-1 -right-1 bg-green-600 rounded-full p-0.5 z-20 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <CheckCircle size={6} className="w-2 h-2 text-white" />
                    </motion.div>
                  )}

                  {/* Current Step Indicator */}
                  {index === currentStep && (
                    <motion.div
                      className="absolute -top-1 -right-1 bg-white rounded-full p-0.5 z-20 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-1 h-1 bg-gradient-to-r from-[#000435] to-[#CF9FFF] rounded-full animate-pulse" />
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content Area - Side by Side */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 p-2 md:p-4">
          {/* Left Side - Text Content with Illustration Above (Hidden on mobile, visible on md and up) */}
          <div className="md:col-span-3 hidden md:flex flex-col justify-center">
            {/* Illustration Above Text Content */}
            {currentStepData.illustration && (
              <motion.div
                key={`illustration-${currentStep}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-2xl p-3 md:p-4 shadow-lg mb-3 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => handleImageZoom(currentStepData.illustration)}
              >
                <div className="relative w-full h-32 md:h-40 rounded-xl overflow-hidden shadow-md"
                >
                  <Image
                    src={currentStepData.illustration}
                    alt={`${currentStepData.title} illustration`}
                    fill
                    style={{ objectFit: "cover" }}
                    className="hover:scale-105 transition-transform duration-300"
                  />
                </div>
              </motion.div>
            )}

            {/* Text Content Below Illustration */}
            <motion.div
              key={`title-${currentStep}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl p-4 md:p-6 shadow-lg"
            >
              <h2 className="text-2xl md:text-3xl font-bold font-saeada text-gray-800 mb-2 md:mb-3 text-center md:text-left">
                {currentStepData.title}
              </h2>
              <div className="flex justify-center md:justify-start mb-3">
                <span className="inline-block px-3 py-1 md:px-4 md:py-2 bg-[#000435] bg-gradient-to-r from-[#000435] to-[#CF9FFF] text-white rounded-full text-sm md:text-base font-bold font-quicksand">
                  {currentStepData.duration}
                </span>
              </div>
              <p className="text-sm md:text-base font-quicksand text-gray-600 leading-relaxed text-center md:text-left">
                {currentStepData.description}
              </p>
            </motion.div>
          </div>

          {/* Right Side - Main Video/Image Content (Order changed for mobile) */}
          <div className="md:col-span-9 order-first md:order-none">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepData.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-80 sm:h-96 md:h-[36rem] bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl overflow-hidden shadow-lg"
                >
                  {currentStepData.video ? (
                    <video
                      key={currentStepData.video}
                      className="w-full h-full object-contain"
                      autoPlay={true}
                      loop={true}
                      muted={true}
                      playsInline={true}
                      controls={false}
                    >
                      <source src={currentStepData.video} type="video/quicktime" />
                      <source src={currentStepData.video} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : currentStepData.image ? (
                    <div
                      className="w-full h-full cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => handleImageZoom(currentStepData.image)}
                    >
                      <Image
                        src={currentStepData.image || "/placeholder.svg"}
                        alt={currentStepData.title}
                        fill
                        style={{ objectFit: "contain" }}
                        priority
                      />
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <span>Vidéo non disponible</span>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

  
        {/* Full Screen Image Modal */}
        <AnimatePresence>
          {showFullScreenImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
              onClick={() => setShowFullScreenImage(false)}
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setShowFullScreenImage(false)}
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <X size={32} />
                </button>
                <Image
                  src={currentStepData.image || "/placeholder.svg"}
                  alt={currentStepData.title}
                  width={800}
                  height={600}
                  className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl"
                />
                <div className="absolute -bottom-16 left-0 right-0 text-center">
                  <h3 className="text-white text-lg font-semibold">{currentStepData.title}</h3>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
