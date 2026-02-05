import { Box } from "@mui/joy"

type AuthLayoutProps = {
  children: React.ReactNode
  backgroundImage: string
  darkBackgroundImage?: string
}

export function AuthLayout({
  children,
  backgroundImage,
  darkBackgroundImage,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
      }}
    >
      {/* Left Panel - Form */}
      <Box
        sx={theme => ({
          width: { xs: "100%", md: "50vw" },
          transition: "width 0.4s",
          transitionDelay: "0.5s",
          position: "relative",
          zIndex: 1,
          display: "flex",
          justifyContent: "flex-end",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255 255 255 / 0.2)",
          [theme.getColorSchemeSelector("dark")]: {
            backgroundColor: "rgba(19 19 24 / 0.4)",
          },
        })}
      >
        {children}
      </Box>

      {/* Right Panel - Background Image */}
      <Box
        sx={theme => ({
          height: "100%",
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          left: { xs: 0, md: "50vw" },
          transition: "background-image 0.4s, left 0.4s !important",
          transitionDelay: "0.5s",
          backgroundColor: "background.level1",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundImage: `url(${backgroundImage})`,
          [theme.getColorSchemeSelector("dark")]: {
            backgroundImage: `url(${darkBackgroundImage ?? backgroundImage})`,
          },
        })}
      />
    </Box>
  )
}
