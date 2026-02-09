import { Box, Button, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Link } from "react-router"
import { ROUTES_KEYS } from "../../../constants"

export const NotFoundPage = () => {
  const { title, description, backHome } = useIntlayer("notfound")

  return (
    <Box
      sx={{
        minHeight: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        px: 2,
        bgcolor: "background.body",
      }}
    >
      <Typography
        level="h1"
        sx={{
          fontSize: { xs: "4rem", sm: "6rem", md: "8rem" },
          fontWeight: "bold",
          color: "primary.500",
          mb: 2,
        }}
      >
        404
      </Typography>
      <Typography
        level="h2"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          mb: 1,
        }}
      >
        {title}
      </Typography>
      <Typography
        level="body-lg"
        sx={{
          color: "text.secondary",
          mb: 4,
          maxWidth: "600px",
        }}
      >
        {description}
      </Typography>
      <Button
        component={Link}
        to={ROUTES_KEYS.ROOT}
        size="lg"
        sx={{ minWidth: { xs: "160px", sm: "200px" } }}
      >
        {backHome}
      </Button>
    </Box>
  )
}
