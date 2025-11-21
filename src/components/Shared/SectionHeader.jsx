import { motion } from "framer-motion";

const SectionHeader = ({
  title,
  subtitle,
  highlight,
  description,
  center = true,
  // New customization props
  titleSize = "xl", // xl, 2xl, 3xl, 4xl
  titleWeight = "light", // light, normal, medium, semibold, bold, black
  highlightWeight = "normal", // separate weight for highlight
  highlightColor = "teal-500", // custom highlight color
  dotColor = "teal-500", // custom dot color
  descriptionSize = "lg", // sm, base, lg, xl
  className = "", // additional classes
  animationDelay = 0, // stagger animation delay
  showDots = true, // toggle dots
  titleClassName = "", // custom title classes
  highlightClassName = "", // custom highlight classes
  lineSpacing = "normal", // normal, tight, snug, relaxed, loose
  highlightOnNewLine = true, // NEW: control whether highlight is on new line
}) => {
  // Size mappings
  const titleSizes = {
    xl: "text-3xl md:text-4xl",
    "2xl": "text-4xl md:text-5xl",
    "3xl": "text-4xl md:text-6xl",
    "4xl": "text-5xl md:text-7xl",
  };

  const titleWeights = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
    black: "font-black",
  };

  const descriptionSizes = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
  };

  // Line spacing mappings
  const lineSpacings = {
    tight: "leading-tight",
    snug: "leading-snug",
    normal: "leading-normal",
    relaxed: "leading-relaxed",
    loose: "leading-loose",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: animationDelay }}
      className={`${center ? "text-center" : "text-left"} mb-10 ${className}`}
    >
      {/* Decorative dots - conditionally rendered */}
      {showDots && subtitle && (
        <div
          className={`inline-flex items-center gap-3 mb-4 ${
            center ? "justify-center" : "justify-start"
          }`}
        >
          <div className={`w-1.5 h-1.5 bg-${dotColor} rounded-full`}></div>
          <div className="text-xs uppercase tracking-widest text-gray-500">
            {subtitle}
          </div>
          <div className={`w-1.5 h-1.5 bg-${dotColor} rounded-full`}></div>
        </div>
      )}

      {/* Main title with highlight */}
      <h1
        className={`${titleSizes[titleSize]} ${titleWeights[titleWeight]} ${lineSpacings[lineSpacing]} text-gray-800 mb-3 ${titleClassName}`}
      >
        {title}
        {highlight && (
          <>
            {/* Conditionally render line break */}
            {highlightOnNewLine && <br />}
            <span
              className={`text-${highlightColor} ${titleWeights[highlightWeight]} ${highlightClassName}`}
            >
              {highlightOnNewLine ? highlight : ` ${highlight}`}
            </span>
          </>
        )}
      </h1>

      {/* Description */}
      {description && (
        <p
          className={`text-gray-600 ${descriptionSizes[descriptionSize]} ${
            center ? "mx-auto" : ""
          } max-w-lg leading-relaxed`}
        >
          {description}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeader;
