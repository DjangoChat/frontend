import { CheckCircle } from "@mui/icons-material"
import { Box, Button, Stack, Typography } from "@mui/joy"
import { useIntlayer } from "react-intlayer"
import { Link } from "react-router"
import { ROUTES_KEYS } from "../../../constants"

export function RegisterSuccessPage() {
  const { title, description, signIn, goHome } = useIntlayer("registersuccess")

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
      <CheckCircle
        sx={{ fontSize: { xs: 60, sm: 70, md: 80 }, color: "#25D366", mb: 2 }}
      />
      <Typography
        level="h2"
        sx={{
          fontSize: { xs: "1.5rem", sm: "2rem", md: "2.5rem" },
          fontWeight: 700,
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
          maxWidth: { xs: "100%", sm: "500px" },
        }}
      >
        {description}
      </Typography>
      <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
        <Button
          component={Link}
          to={ROUTES_KEYS.LOGIN}
          size="lg"
          sx={{
            minWidth: "180px",
            bgcolor: "#25D366",
            "&:hover": {
              bgcolor: "#128C7E",
            },
          }}
        >
          {signIn}
        </Button>
        <Button
          component={Link}
          to={ROUTES_KEYS.ROOT}
          size="lg"
          variant="outlined"
          color="neutral"
          sx={{ minWidth: "180px" }}
        >
          {goHome}
        </Button>
      </Stack>
    </Box>
  )
}
