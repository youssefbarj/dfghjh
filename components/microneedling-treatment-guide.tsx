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
    duration: "48s",
    image: "/images/step 1.png",
    video: "https://player.vimeo.com/video/1155571172?h=7f2b0a4b63&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Avec votre crayon blanc et des mains gantées, commencez par tracer les lignes du philtrum pour aligner le centre du visage. Définissez ensuite les pointes de l'arc de Cupidon et reliez les contours jusqu'aux commissures externes. Terminez par la courbe de la lèvre inférieure : cet enchaînement précis vous permet de verrouiller une forme parfaitement symétrique avant de passer à la pigmentation.",
    benefits: ["Points de repère centraux", "Symétrie garantie", "Base précise"],
  },
  {
    id: 2,
    title: "Finitions du Tracé et Installation de la Cartouche",
    duration: "25s",
    image: "/images/step 2.png",
    video: "https://player.vimeo.com/video/1155571341?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Une fois votre marquage terminé, affinez les contours à l'aide d'une micro-brosse pour garantir une netteté absolue avant de piquer. Passez ensuite à la préparation hygiénique : déballez votre cartouche stérile sans toucher l'aiguille, insérez-la dans le dermographe et effectuez un quart de tour pour la verrouiller en toute sécurité avant la mise en marche.",
    benefits: ["Forme en V précise", "Courbes symétriques", "Point central défini"],
  },
  {
    id: 3,
    title: "La Prise de Pigment",
    duration: "30s",
    image: "/images/step 3.png",
    video: "https://player.vimeo.com/video/1155576169?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Remplissez votre godet (ou bague) de pigment. Mettez le dermogrape en marche, puis plongez la pointe de l'aiguille dans l'encre à la verticale. Laissez le pigment remonter naturellement dans le réservoir de la cartouche par capillarité, en veillant à ne pas heurter le fond du récipient pour préserver le piquant de l'aiguille.",
    benefits: ["Ligne uniforme", "Guide précis", "Contour défini"],
  },
  {
    id: 4,
    title: "Test de Débit et Premier Trait",
    duration: "30s",
    image: "/images/step 4.jpeg",
    video: "https://player.vimeo.com/video/1155571308?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Avant de vous lancer dans le tracé complet, effectuez toujours un test de fonctionnement sur une petite section du contour. Posez l'aiguille à 90° et réalisez un court segment : cela vous permet de valider instantanément que le pigment s'implante bien et que votre vitesse de main est synchronisée avec la vitesse de la machine.",
    benefits: ["Forme équilibrée", "Symétrie parfaite", "Harmonie générale"],
  },
  {
    id: 5,
    title: "Le Tracé du Contour Supérieur",
    duration: "26s",
    image: "/images/step 5.jpeg",
    video: "https://player.vimeo.com/video/1155581409?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Partez de la pointe de l'arc de Cupidon et descendez vers la commissure avec une extrême lenteur. Votre geste doit être chirurgical : ne balayez pas, mais tirez une ligne continue en maintenant une profondeur constante. C'est cette régularité qui garantira un contour net et défini du premier coup, sans avoir besoin de repasser.",
    benefits: ["Symétrie vérifiée", "Proportions correctes", "Ajustements possibles"],
  },
  {
    id: 6,
    title: "Le Tracé du Contour Inférieur",
    duration: "54s",
    image: "/images/step 6.png",
    video: "https://player.vimeo.com/video/1155571107?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Tracez la courbe de la lèvre inférieure pour finaliser le cadre de la bouche. Assurez une connexion fluide avec les commissures en maintenant une profondeur constante tout le long du marquage. Ce contour est essentiel pour \"asseoir\" la forme et donner l'effet de plénitude visuelle nécessaire à une bouche harmonieuse.",
    benefits: ["Stérilité assurée", "Sécurité garantie", "Équipement vérifié"],
  },
  {
    id: 7,
    title: "Nettoyage et Vérification du Tracé",
    duration: "9s",
    image: "/images/step 7.png",
    video: "https://player.vimeo.com/video/1155571277?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Passez une lingette humide sur l'ensemble de la bouche pour retirer l'excédent de pigment et effacer les traits de construction blancs. Ce nettoyage est indispensable pour révéler la ligne réelle de votre tatouage et vérifier instantanément la netteté de votre contour avant de passer au remplissage.",
    benefits: ["Fixation sécurisée", "Stabilité assurée", "Mécanisme vérifié"],
  },
  {
    id: 8,
    title: "Renforcement et Sécurisation du Contour",
    duration: "9s",
    image: "/images/step 8.png",
    video: "https://player.vimeo.com/video/1155571277?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Repassez méticuleusement sur l'ensemble de votre tracé pour le \"verrouiller\". Ce second passage sert à densifier la ligne sans l'élargir : votre objectif est de sécuriser le contour pour qu'il ne s'efface pas lorsque vous commencerez le remplissage. Gardez la même lenteur et la même profondeur pour obtenir une bordure nette et indélébile.",
    benefits: ["Profondeur optimale", "Technique adaptée", "Dépôt précis"],
  },
  {
    id: 9,
    title: "Validation de la Rétention du Contour",
    duration: "31s",
    image: "/images/step 9.jpeg",
    video: "https://player.vimeo.com/video/1155571195?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Nettoyez fermement la zone pour évaluer la solidité de votre tracé après le renforcement. Le pigment doit être incrusté de manière homogène et la ligne doit rester nette même après le passage de la lingette. C'est votre \"crash test\" : si le trait s'efface ou paraît pointillé, votre piquage manquait de profondeur ou de lenteur.",
    benefits: ["Mouvement fluide", "Fonctionnement vérifié", "Performance optimale"],
  },
  {
    id: 10,
    title: "Changement de Cartouche : Passage au Remplissage",
    duration: "23s",
    image: "/images/step 10.jpeg",
    video: "https://player.vimeo.com/video/1155584621?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Le contour étant sécurisé, retirez l'aiguille de traçage (liner) de votre appareil. Déballez stérilement votre nouvelle cartouche destinée au remplissage (souvent une configuration plus large). Insérez-la et verrouillez-la fermement : ce changement d'outil est impératif pour passer du travail de précision au travail de mise en couleur de la chair des lèvres.",
    benefits: ["Chargement optimal", "Application contrôlée", "Couleur uniforme"],
  },
  {
    id: 11,
    title: "Initiation à la Technique de Remplissage",
    duration: "1min 20s",
    image: "/images/step 11.png",
    video: "https://player.vimeo.com/video/1155571152?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Débutez le remplissage par l'arc de Cupidon en adoptant un mouvement de balayage court et régulier (souvent appelé \"pendulaire\"). Saturez la zone progressivement en chevauchant vos traits pour éviter les manques, tout en veillant à ne jamais dépasser la bordure que vous avez tracée. Gardez une pression constante pour obtenir une couleur homogène dès le premier passage.",
    benefits: ["Contour précis", "Ligne continue", "Définition nette"],
  },
  {
    id: 12,
    title: "Remplissage de la Lèvre Supérieure",
    duration: "1min 2s",
    image: "/images/step 12.png",
    video: "https://player.vimeo.com/video/1155571259?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Commencez la mise en couleur de la lèvre supérieure en utilisant un mouvement de balayage pendulaire. Travaillez par petites sections progressives en chevauchant vos passages pour obtenir une saturation homogène. Maintenez une tension ferme de la peau et veillez à ne jamais dépasser votre ligne de contour \"barrière\" lors des allers-retours.",
    benefits: ["Saturation évaluée", "Couleur renforcée", "Définition parfaite"],
  },
  {
    id: 13,
    title: "Travail de Précision des Commissures",
    duration: "39s",
    image: "/images/step 13.png",
    video: "https://player.vimeo.com/video/1155571319?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Réduisez votre geste pour travailler la zone charnière des commissures. Connectez la lèvre supérieure et inférieure avec des mouvements courts et précis vers l'intérieur de la bouche. Soyez vigilante : la peau y est très fine, il faut saturer la couleur sans traumatiser le pli pour éviter toute migration de pigment.",
    benefits: ["Contour net", "Symétrie validée", "Uniformité vérifiée"],
  },
  {
    id: 14,
    title: "Finalisation de la Lèvre Supérieure",
    duration: "16s",
    image: "/images/step 14.png",
    video: "https://player.vimeo.com/video/1155588298?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Achevez la mise en couleur de la lèvre supérieure en saturant le corps de la lèvre jusqu'à la zone de transition (wet line). Assurez-vous de chevaucher légèrement vos zones précédentes pour éviter les \"trous\" de couleur ou les démarcations. Une saturation uniforme et fluide à cette étape est primordiale pour garantir un résultat guéri impeccable.",
    benefits: ["Nouvelle cartouche", "Configuration adaptée", "Hygiène maintenue"],
  },
  {
    id: 15,
    title: "Remplissage de la Lèvre Inférieure",
    duration: "51s",
    image: "/images/step 15.png",
    video: "https://player.vimeo.com/video/1155571222?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Reproduisez le mouvement de balayage sur la lèvre inférieure en maintenant une tension parfaite de la peau. Cette zone étant souvent plus charnue, travaillez avec régularité pour saturer le pigment au cœur de la lèvre, là où la lumière se reflète naturellement. Assurez-vous que la transition avec le contour reste imperceptible.",
    benefits: ["Effet poudré", "Aspect naturel", "Technique pixellisée"],
  },
  {
    id: 16,
    title: "Finalisation de la Lèvre Inférieure",
    duration: "32s",
    image: "/images/step 16.png",
    video: "https://player.vimeo.com/video/1155571237?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Terminez le remplissage en travaillant le côté opposé de la lèvre inférieure. Votre priorité est la symétrie de la saturation : la couleur doit être aussi dense à gauche qu'à droite. Veillez à fondre parfaitement la jonction au centre pour qu'aucune démarcation ne soit visible une fois la cicatrisation terminée.",
    benefits: ["Couleur homogène", "Saturation uniforme", "Mouvement constant"],
  },
  {
    id: 17,
    title: "Le Masque de Pigment (The Soak)",
    duration: "22s",
    image: "/images/step 17.png",
    video: "https://player.vimeo.com/video/1155571060?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Pour clore la séance, appliquez une couche généreuse de pigment pur sur l'ensemble de la bouche à l'aide d'une micro-brosse. Laissez poser ce masque quelques minutes. Bien que le tatouage soit terminé, cette étape permet de saturer les dernières micro-ouvertures de la peau, d'apaiser les tissus et de préparer les lèvres pour la \"révélation\" finale lors du nettoyage ultime.",
    benefits: ["Zones délicates", "Angle adapté", "Résultat net"],
  },
  {
    id: 18,
    title: "Mise sous Occlusion",
    duration: "10s",
    image: "/images/step 18.png",
    video: "https://player.vimeo.com/video/1155571133?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Recouvrez immédiatement le masque de pigment avec un film plastique étirable. Lissez bien le film pour chasser les bulles d'air et assurer un contact hermétique. Cette occlusion empêche le pigment de sécher et favorise son absorption finale par les tissus (effet de macération contrôlée) durant le temps de pause.",
    benefits: ["Couches multiples", "Profondeur créée", "Richesse de couleur"],
  },
  {
    id: 19,
    title: "Le Nettoyage Final et la Révélation",
    duration: "40s",
    image: "/images/step 19.png",
    video: "https://player.vimeo.com/video/1155571291?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Retirez le film protecteur et procédez au nettoyage final pour enlever tout le surplus de pigment laissé par le masque. C'est l'étape de la \"révélation\" : essuyez sans crainte pour découvrir la couleur réelle et la saturation de votre travail. Terminez en appliquant une touche de baume ou de gloss apaisant pour hydrater les lèvres instantanément et sublimer le résultat pour la photographie.",
    benefits: ["Pénétration optimisée", "Rétention maximale", "Fixation du pigment"],
  },
  {
    id: 20,
    title: "Inspection et Nettoyage de Finition",
    duration: "22s",
    image: "/images/step 20.png",
    video: "https://player.vimeo.com/video/1155590411?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Une fois le surplus retiré, passez une lingette propre pour parfaire le nettoyage du contour de la bouche et de la peau environnante. C'est l'étape de vérification ultime : la zone doit être nette, sans bavure, prête pour la découverte par la cliente et la prise de vue photographique.",
    benefits: ["Couleur révélée", "Saturation finale", "Résultat uniforme"],
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
  const [zoomedImageSrc, setZoomedImageSrc] = useState<string | null>(null)

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
    setZoomedImageSrc(null)
  }

  const handleStepClick = (stepIndex: number) => {
    setCurrentStep(stepIndex)
    setProgress(0)
    setIsPlaying(false)
    setShowCompletion(false)
    setShowMobileDetails(false)
    setShowFullScreenVideo(false)
    setShowFullScreenImage(false)
    setZoomedImageSrc(null)
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
      setZoomedImageSrc(null)
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
      setZoomedImageSrc(null)
    }
  }

  const handleImageZoom = (imageSrc?: string) => {
    if (!imageSrc) return
    setZoomedImageSrc(imageSrc)
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
          20/20 Étapes
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
                <span>20 étapes essentielles</span>
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
          <div className="md:col-span-4 hidden md:flex flex-col justify-center">
            {/* Illustration Above Text Content */}
            {currentStepData.illustration && (
              <motion.div
                key={`illustration-${currentStep}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative w-full aspect-video rounded-xl overflow-hidden cursor-pointer mb-3 bg-white shadow-lg"
                onClick={() => handleImageZoom(currentStepData.illustration)}
              >
                <Image
                  src={currentStepData.illustration}
                  alt={`${currentStepData.title} illustration`}
                  fill
                  style={{ objectFit: "contain" }}
                  className="hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
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
          <div className="md:col-span-8 order-first md:order-none">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStepData.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-80 sm:h-96 md:h-[42rem] bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl overflow-hidden shadow-lg"
                >
                  {currentStepData.video ? (
                    <div className="relative w-full h-full">
                      <iframe
                        key={currentStepData.video}
                        className="w-full h-full"
                        src={currentStepData.video}
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture; clipboard-write; encrypted-media; web-share"
                        allowFullScreen
                        onLoad={(e) => {
                          const target = e.target as HTMLIFrameElement;
                          target.parentElement?.querySelector('.loading-spinner')?.classList.add('hidden');
                        }}
                      />
                      <div className="loading-spinner absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-violet-50">
                        <Image
                          src="/loading-spinner.png"
                          alt="Loading..."
                          width={50}
                          height={50}
                          className="animate-spin"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
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
              onClick={() => {setShowFullScreenImage(false); setZoomedImageSrc(null);} }
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
                className="relative max-w-4xl max-h-full"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => {setShowFullScreenImage(false); setZoomedImageSrc(null);} }
                  className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200"
                >
                  <X size={32} />
                </button>
                <Image
                  src={zoomedImageSrc || currentStepData.image || "/placeholder.svg"}
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
