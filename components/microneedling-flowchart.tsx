"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronDown, ChevronUp } from "lucide-react"

interface StepProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  isLast?: boolean
  colorScheme: "primary" | "secondary" | "tertiary" | "quaternary" | "quinary"
}

const colorSchemes = {
  primary: {
    background: "linear-gradient(135deg, #F765A3 0%, #F9D2D9 100%)",
    border: "#F765A3",
    text: "#161616",
  },
  secondary: {
    background: "linear-gradient(135deg, #C3B1E1 0%, #F765A3 100%)",
    border: "#C3B1E1",
    text: "#161616",
  },
  tertiary: {
    background: "linear-gradient(135deg, #BFE4E4 0%, #A7C7E7 100%)",
    border: "#BFE4E4",
    text: "#161616",
  },
  quaternary: {
    background: "linear-gradient(135deg, #F765A3 0%, #BFE4E4 100%)",
    border: "#F765A3",
    text: "#161616",
  },
  quinary: {
    background: "linear-gradient(135deg, #FFA4B6 0%, #F9D2D9 100%)",
    border: "#FFA4B6",
    text: "#161616",
  },
}

const Step = ({ title, subtitle, children, isLast = false, colorScheme }: StepProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const colors = colorSchemes[colorScheme]

  return (
    <>
      <motion.div
        className="w-full border-2 rounded-lg shadow-lg overflow-hidden"
        style={{ borderColor: colors.border }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ scale: 1.02, boxShadow: "0 10px 25px rgba(247, 101, 163, 0.2)" }}
      >
        <div
          className="cursor-pointer p-6 flex flex-col items-center justify-center"
          style={{ background: colors.background }}
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <h2
            className="text-xl md:text-2xl font-black text-center mb-2"
            style={{
              color: colors.text,
              fontFamily: "Montserrat, sans-serif",
            }}
          >
            {title}
          </h2>
          {subtitle && (
            <p
              className="text-center font-bold"
              style={{
                color: colors.text,
                fontFamily: "Montserrat, sans-serif",
              }}
            >
              {subtitle}
            </p>
          )}
          <button className="mt-3 p-2 rounded-full transition-all duration-200 hover:bg-white/20">
            {isExpanded ? (
              <ChevronUp size={24} style={{ color: colors.text }} />
            ) : (
              <ChevronDown size={24} style={{ color: colors.text }} />
            )}
          </button>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
              style={{ backgroundColor: "#F5F5F5" }}
            >
              <div className="p-6 border-t-2" style={{ borderColor: colors.border }}>
                {children}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {!isLast && (
        <motion.div
          className="flex justify-center my-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <svg width="50" height="50" viewBox="0 0 50 50">
            <motion.path
              d="M25 8 L25 42 M15 32 L25 42 L35 32"
              stroke="#F765A3"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </svg>
        </motion.div>
      )}
    </>
  )
}

const InfoCard = ({ title, content, bgColor }: { title: string; content: string; bgColor: string }) => (
  <motion.div
    className="p-4 rounded-lg shadow-md"
    style={{ backgroundColor: bgColor }}
    whileHover={{ scale: 1.05, boxShadow: "0 8px 20px rgba(247, 101, 163, 0.15)" }}
    transition={{ duration: 0.2 }}
  >
    <h3
      className="font-bold mb-3 text-sm md:text-base"
      style={{
        color: "#161616",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {title}
    </h3>
    <p
      className="text-sm leading-relaxed"
      style={{
        color: "#161616",
        fontFamily: "Montserrat, sans-serif",
      }}
    >
      {content}
    </p>
  </motion.div>
)

export default function MicroneedlingFlowchart() {
  return (
    <div className="w-full max-w-4xl">
      <Step title="MECHANICAL ACTION" subtitle="Micro-perforations of the epidermis and dermis" colorScheme="primary">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard
            title="The process"
            content="Creation of micro-channels in the skin using fine needles"
            bgColor="#BFE4E4"
          />
          <InfoCard title="Depth" content="Variable depending on the treated area (0.5mm to 2.5mm)" bgColor="#A7C7E7" />
        </div>
      </Step>

      <Step title="SKIN REACTION (SELF-REPAIR)" colorScheme="secondary">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard
            title="Stimulation of collagen and elastin"
            content="Triggers natural production of collagen and elastin to repair micro-lesions"
            bgColor="#F9D2D9"
          />
          <InfoCard
            title="Activation of cellular renewal"
            content="Accelerates the skin regeneration process for better texture"
            bgColor="#FFA4B6"
          />
        </div>
      </Step>

      <Step title="ACTIVE INGREDIENT ABSORPTION (SERUM)" colorScheme="tertiary">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard
            title="Deep penetration of skin-appropriate serum"
            content="Micro-channels allow up to 80% more efficient absorption of active ingredients"
            bgColor="#C3B1E1"
          />
          <InfoCard
            title="Targeted actions according to need"
            content="Specific serums for acne, spots, hydration, etc."
            bgColor="#F9D2D9"
          />
        </div>
      </Step>

      <Step title="PROGRESSIVE RESULTS" colorScheme="quaternary">
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard
            title="Brighter and more even complexion"
            content="Visible improvement in skin texture and radiance"
            bgColor="#BFE4E4"
          />
          <InfoCard
            title="Reduction of imperfections"
            content="Reduction of acne, spots, and enlarged pores"
            bgColor="#A7C7E7"
          />
        </div>
      </Step>

      <Step title="OPTION: LIGHT THERAPY AT THE END OF TREATMENT" colorScheme="quinary" isLast={true}>
        <div className="grid md:grid-cols-3 gap-6">
          <InfoCard
            title="Scars and collagen"
            content="Red light (630-660nm) to further stimulate collagen production"
            bgColor="#C3B1E1"
          />
          <InfoCard
            title="Acne"
            content="Blue light (415-430nm) for its antibacterial properties"
            bgColor="#BFE4E4"
          />
          <InfoCard
            title="Pigmentation spots"
            content="Yellow light (585-595nm) to reduce hyperpigmentation"
            bgColor="#FFA4B6"
          />
        </div>
      </Step>
    </div>
  )
}
