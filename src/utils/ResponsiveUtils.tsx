import React, { useState, useEffect } from "react";

// Image wrapper component with loading state
interface ImageWithLoadingProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export const ImageWithLoading: React.FC<ImageWithLoadingProps> = ({
  src,
  alt,
  className = "",
  priority = false,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isError, setIsError] = useState(false);

  return (
    <div className="relative">
      {/* Loading skeleton */}
      {!isLoaded && !isError && (
        <div className={`${className} bg-gray-300 animate-pulse`}></div>
      )}
      
      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        className={`${className} transition-opacity duration-300 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        loading={priority ? "eager" : "lazy"}
        onLoad={() => setIsLoaded(true)}
        onError={() => setIsError(true)}
      />
      
      {/* Fallback for failed loads */}
      {isError && (
        <div className={`${className} flex items-center justify-center bg-gray-200 text-gray-500`}>
          <span>Image not available</span>
        </div>
      )}
    </div>
  );
};

// Section wrapper with built-in animation on scroll
interface SectionProps {
  id?: string;
  className?: string;
  children: React.ReactNode;
  animate?: boolean;
}

export const Section: React.FC<SectionProps> = ({
  id,
  className = "",
  children,
  animate = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!animate) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById(id || "");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, [id, animate]);

  return (
    <section
      id={id}
      className={`section-container section-padding ${className} ${
        animate ? "transition-all duration-700 transform" : ""
      } ${isVisible || !animate ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
    >
      {children}
    </section>
  );
};

// Container for properly centered and responsive content
interface ContentContainerProps {
  className?: string;
  children: React.ReactNode;
}

export const ContentContainer: React.FC<ContentContainerProps> = ({
  className = "",
  children,
}) => {
  return (
    <div className={`w-full max-w-screen-xl mx-auto px-4 md:px-6 xl:px-8 ${className}`}>
      {children}
    </div>
  );
};

// Responsive two-column grid layout
interface TwoColumnProps {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  reverseOnMobile?: boolean;
  className?: string;
  leftClassName?: string;
  rightClassName?: string;
}

export const TwoColumn: React.FC<TwoColumnProps> = ({
  leftContent,
  rightContent,
  reverseOnMobile = false,
  className = "",
  leftClassName = "",
  rightClassName = "",
}) => {
  return (
    <div
      className={`flex flex-col ${reverseOnMobile ? "flex-col-reverse" : ""} md:flex-row w-full gap-8 ${className}`}
    >
      <div className={`w-full md:w-1/2 ${leftClassName}`}>{leftContent}</div>
      <div className={`w-full md:w-1/2 ${rightClassName}`}>{rightContent}</div>
    </div>
  );
};

// Animated element that appears when scrolled into view
interface AnimatedElementProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
  animation?: "fade-up" | "fade-in" | "slide-left" | "slide-right";
}

export const AnimatedElement: React.FC<AnimatedElementProps> = ({
  className = "",
  children,
  delay = 0,
  animation = "fade-up",
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, []);

  const getAnimationClasses = () => {
    if (!isVisible) {
      switch (animation) {
        case "fade-in":
          return "opacity-0";
        case "fade-up":
          return "opacity-0 translate-y-8";
        case "slide-left":
          return "opacity-0 -translate-x-8";
        case "slide-right":
          return "opacity-0 translate-x-8";
        default:
          return "opacity-0";
      }
    }
    return "opacity-100 translate-x-0 translate-y-0";
  };

  return (
    <div
      ref={elementRef}
      className={`transition-all duration-700 ${getAnimationClasses()} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// Utility function for detecting screen size breakpoints
export const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState<string>("");

  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < 640) {
        setScreenSize("sm");
      } else if (width < 768) {
        setScreenSize("md");
      } else if (width < 1024) {
        setScreenSize("lg");
      } else {
        setScreenSize("xl");
      }
    };

    updateScreenSize();
    window.addEventListener("resize", updateScreenSize);

    return () => window.removeEventListener("resize", updateScreenSize);
  }, []);

  return screenSize;
};
