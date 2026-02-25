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
    title: "Marking the philtral columns",
    duration: "48s",
    image: "/images/step 1.png",
    video: "https://player.vimeo.com/video/1155571172?h=7f2b0a4b63&badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "With your white pencil and gloved hands, start by tracing the lines of the philtrum to align the center of the face. Then define the tips of the Cupid's bow and connect the contours to the outer corners. Finish with the curve of the lower lip: this precise sequence allows you to lock in a perfectly symmetrical shape before moving on to pigmentation.",
    benefits: ["Central reference points", "Guaranteed symmetry", "Precise foundation"],
  },
  {
    id: 2,
    title: "Tracing Finishes and Cartridge Installation",
    duration: "25s",
    image: "/images/step 2.png",
    video: "https://player.vimeo.com/video/1155571341?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Once your marking is complete, refine the contours using a micro-brush to guarantee absolute sharpness before piercing. Then proceed to hygienic preparation: unwrap your sterile cartridge without touching the needle, insert it into the dermograph and perform a quarter turn to securely lock it before starting up.",
    benefits: ["Precise V shape", "Symmetrical curves", "Defined central point"],
  },
  {
    id: 3,
    title: "Pigment Intake",
    duration: "30s",
    image: "/images/step 3.png",
    video: "https://player.vimeo.com/video/1155576169?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Fill your pigment cup (or ring) with pigment. Turn on the dermograph, then dip the needle tip vertically into the ink. Let the pigment rise naturally into the cartridge reservoir by capillary action, being careful not to hit the bottom of the container to preserve the needle sharpness.",
    benefits: ["Uniform line", "Precise guide", "Defined contour"],
  },
  {
    id: 4,
    title: "Flow Test and First Stroke",
    duration: "30s",
    image: "/images/step 4.jpeg",
    video: "https://player.vimeo.com/video/1155571308?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Before embarking on the complete tracing, always perform a function test on a small section of the contour. Place the needle at 90° and execute a short segment: this allows you to instantly validate that the pigment is implanting properly and that your hand speed is synchronized with the machine speed.",
    benefits: ["Balanced shape", "Perfect symmetry", "Overall harmony"],
  },
  {
    id: 5,
    title: "Upper Contour Tracing",
    duration: "26s",
    image: "/images/step 5.jpeg",
    video: "https://player.vimeo.com/video/1155581409?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Start from the tip of the Cupid's bow and descend toward the corner with extreme slowness. Your gesture must be surgical: do not sweep, but draw a continuous line while maintaining constant depth. It is this regularity that will guarantee a sharp and defined contour on the first attempt, without needing to go over it again.",
    benefits: ["Symmetry verified", "Correct proportions", "Possible adjustments"],
  },
  {
    id: 6,
    title: "Lower Contour Tracing",
    duration: "54s",
    image: "/images/step 6.png",
    video: "https://player.vimeo.com/video/1155571107?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Trace the curve of the lower lip to finalize the mouth frame. Ensure a smooth connection with the corners while maintaining constant depth throughout the marking. This contour is essential to \"anchor\" the shape and provide the visual fullness effect necessary for a harmonious mouth.",
    benefits: ["Sterility assured", "Safety guaranteed", "Equipment verified"],
  },
  {
    id: 7,
    title: "Cleaning and Tracing Verification",
    duration: "9s",
    image: "/images/step 7.png",
    video: "https://player.vimeo.com/video/1155571277?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Wipe a damp wipe over the entire mouth to remove excess pigment and erase the white construction lines. This cleaning is essential to reveal the actual line of your tattoo and instantly verify the sharpness of your contour before moving on to filling.",
    benefits: ["Secure fixation", "Stability assured", "Mechanism verified"],
  },
  {
    id: 8,
    title: "Contour Reinforcement and Securing",
    duration: "9s",
    image: "/images/step 8.png",
    video: "https://player.vimeo.com/video/1155571277?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Go meticulously over your entire tracing to \"lock it in\". This second pass serves to densify the line without widening it: your goal is to secure the contour so it doesn't fade when you begin filling. Maintain the same slowness and same depth to obtain a sharp and indelible border.",
    benefits: ["Optimal depth", "Adapted technique", "Precise deposit"],
  },
  {
    id: 9,
    title: "Contour Retention Validation",
    duration: "31s",
    image: "/images/step 9.jpeg",
    video: "https://player.vimeo.com/video/1155571195?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Clean the area firmly to evaluate the solidity of your tracing after reinforcement. The pigment must be embedded homogeneously and the line must remain sharp even after wiping with the wipe. This is your \"crash test\": if the line fades or appears dotted, your piercing lacked depth or slowness.",
    benefits: ["Smooth movement", "Operation verified", "Optimal performance"],
  },
  {
    id: 10,
    title: "Cartridge Change: Transition to Filling",
    duration: "23s",
    image: "/images/step 10.jpeg",
    video: "https://player.vimeo.com/video/1155584621?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "With the contour secured, remove the tracing needle (liner) from your device. Sterilely unwrap your new cartridge intended for filling (often a wider configuration). Insert it and lock it firmly: this tool change is imperative to transition from precision work to lip flesh coloring work.",
    benefits: ["Optimal loading", "Controlled application", "Uniform color"],
  },
  {
    id: 11,
    title: "Introduction to the Filling Technique",
    duration: "1min 20s",
    image: "/images/step 11.png",
    video: "https://player.vimeo.com/video/1155571152?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Begin filling at the Cupid's bow using a short, regular sweeping motion (often called \"pendulum\"). Gradually saturate the area by overlapping your strokes to avoid gaps, while ensuring you never exceed the border you've traced. Maintain constant pressure to achieve a uniform color from the first pass.",
    benefits: ["Precise contour", "Continuous line", "Sharp definition"],
  },
  {
    id: 12,
    title: "Upper Lip Filling",
    duration: "1min 2s",
    image: "/images/step 12.png",
    video: "https://player.vimeo.com/video/1155571259?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Begin coloring the upper lip using a pendulum sweeping motion. Work in small progressive sections by overlapping your passes to achieve homogeneous saturation. Maintain firm skin tension and ensure you never exceed your \"barrier\" contour line during back-and-forth movements.",
    benefits: ["Saturation evaluated", "Color reinforced", "Perfect definition"],
  },
  {
    id: 13,
    title: "Precision Work on the Lip Corners",
    duration: "39s",
    image: "/images/step 13.png",
    video: "https://player.vimeo.com/video/1155571319?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Reduce your movement to work on the hinge area of the lip corners. Connect the upper and lower lip with short, precise movements towards the inside of the mouth. Be vigilant: the skin here is very thin, you need to saturate the color without traumatizing the fold to avoid any pigment migration.",
    benefits: ["Sharp contour", "Symmetry validated", "Uniformity verified"],
  },
  {
    id: 14,
    title: "Upper Lip Finalization",
    duration: "16s",
    image: "/images/step 14.png",
    video: "https://player.vimeo.com/video/1155588298?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Complete the coloring of the upper lip by saturating the body of the lip up to the transition area (wet line). Ensure you slightly overlap your previous areas to avoid color \"holes\" or demarcations. Uniform and smooth saturation at this stage is crucial to guarantee an impeccable healed result.",
    benefits: ["New cartridge", "Adapted configuration", "Hygiene maintained"],
  },
  {
    id: 15,
    title: "Lower Lip Filling",
    duration: "51s",
    image: "/images/step 15.png",
    video: "https://player.vimeo.com/video/1155571222?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Reproduce the sweeping motion on the lower lip while maintaining perfect skin tension. Since this area is often fleshier, work with regularity to saturate the pigment at the heart of the lip, where light naturally reflects. Ensure the transition with the contour remains imperceptible.",
    benefits: ["Powdery effect", "Natural appearance", "Pixelized technique"],
  },
  {
    id: 16,
    title: "Lower Lip Finalization",
    duration: "32s",
    image: "/images/step 16.png",
    video: "https://player.vimeo.com/video/1155571237?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Complete the filling by working on the opposite side of the lower lip. Your priority is saturation symmetry: the color must be as dense on the left as on the right. Ensure you perfectly blend the junction at the center so no demarcation is visible once healing is complete.",
    benefits: ["Homogeneous color", "Uniform saturation", "Constant movement"],
  },
  {
    id: 17,
    title: "The Pigment Mask (The Soak)",
    duration: "22s",
    image: "/images/step 17.png",
    video: "https://player.vimeo.com/video/1155571060?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "To conclude the session, apply a generous layer of pure pigment over the entire mouth using a micro-brush. Leave this mask on for a few minutes. Although the tattoo is complete, this step helps saturate the last micro-openings of the skin, soothe the tissues, and prepare the lips for the final \"reveal\" during the ultimate cleaning.",
    benefits: ["Delicate areas", "Adapted angle", "Sharp result"],
  },
  {
    id: 18,
    title: "Occlusion Application",
    duration: "10s",
    image: "/images/step 18.png",
    video: "https://player.vimeo.com/video/1155571133?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Immediately cover the pigment mask with a stretchable plastic film. Smooth the film well to eliminate air bubbles and ensure airtight contact. This occlusion prevents the pigment from drying and promotes its final absorption by the tissues (controlled maceration effect) during the setting time.",
    benefits: ["Multiple layers", "Depth created", "Color richness"],
  },
  {
    id: 19,
    title: "Final Cleaning and Reveal",
    duration: "40s",
    image: "/images/step 19.png",
    video: "https://player.vimeo.com/video/1155571291?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Remove the protective film and proceed with final cleaning to remove all excess pigment left by the mask. This is the \"reveal\" step: wipe without fear to discover the real color and saturation of your work. Finish by applying a touch of soothing balm or gloss to instantly hydrate the lips and enhance the result for photography.",
    benefits: ["Optimized penetration", "Maximum retention", "Pigment fixation"],
  },
  {
    id: 20,
    title: "Inspection and Final Cleaning",
    duration: "22s",
    image: "/images/step 20.png",
    video: "https://player.vimeo.com/video/1155590411?badge=0&autopause=0&player_id=0&app_id=58479&autoplay=1&loop=1&controls=0",
    description: "Once the excess is removed, use a clean wipe to perfect the cleaning of the mouth contour and surrounding skin. This is the ultimate verification step: the area should be clean, without smudges, ready for the client's discovery and photographic capture.",
    benefits: ["Color revealed", "Final saturation", "Uniform result"],
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
        <h2 className="text-3xl md:text-4xl font-bold font-saeada text-blue-900 mb-3">Congratulations!</h2>
        <p className="text-lg md:text-xl font-quicksand text-blue-800 mb-2">
          Lip Blush training completed successfully
        </p>
        <p className="text-base font-quicksand text-blue-700 mb-4">All steps have been completed</p>

        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mx-4">
          <p className="text-sm font-quicksand text-gray-600 mb-1">Training carried out with</p>
          <h3 className="text-xl font-bold font-saeada text-brand-gradient">Professional Lip Blush Guide</h3>
          <p className="text-xs font-quicksand text-gray-500 mt-1">Certified method • Silicone model</p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="flex gap-2 md:gap-3 mt-6 flex-wrap justify-center"
      >
        <div className="bg-green-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          20/20 Steps
        </div>
        <div className="bg-blue-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          20 Minutes
        </div>
        <div className="bg-purple-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Certified
        </div>
        <div className="bg-pink-500 text-white px-3 py-1 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-bold">
          Professional
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
          Restart
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
                Back to guide
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
                Lip Blush Training
              </h1>
              <div className="flex flex-wrap gap-2 text-sm font-quicksand text-gray-600">
                <span>Practice on silicone model</span>
                <span className="hidden sm:inline">•</span>
                <span>20 essential steps</span>
                <span className="hidden sm:inline">•</span>
                <span>Professional technique</span>
                <span className="hidden sm:inline">•</span>
                <span>Dermograph required</span>
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
                    <strong>Silicone model with lips required</strong> - To be purchased separately
                  </p>
                  <p className="text-xs text-amber-700 mt-1">
                    This lip blush training requires a silicone model with lip area for practice before working on real clients.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Progress Bar Section */}
        <div className="mt-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-quicksand text-gray-600">Lip Blush training progress</span>
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
                Step {currentStep + 1} of {treatmentSteps.length}
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
                  className="relative w-full aspect-video bg-gradient-to-br from-blue-50 to-violet-50 rounded-2xl overflow-hidden shadow-lg"
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
                        loading="eager"
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
