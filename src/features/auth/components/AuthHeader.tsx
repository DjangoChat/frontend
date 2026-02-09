import { Language as LanguageIcon } from "@mui/icons-material"
import { Box, IconButton, Option, Select, Stack, Typography } from "@mui/joy"
import { getLocalizedUrl, type LocalesValues } from "intlayer"
import { useLocale } from "react-intlayer"
import { Link, useLocation, useNavigate } from "react-router"
import { ThemeToggleButton } from "../../../components"
import { LANGUAGES, ROUTES_KEYS } from "../../../constants"

type AuthHeaderProps = {
  appName: string
}

export function AuthHeader({ appName }: AuthHeaderProps) {
  const { setLocale, locale } = useLocale()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box
      component="header"
      sx={{
        py: 3,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Link
        to={ROUTES_KEYS.ROOT}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <Stack direction="row" gap={2} alignItems="center">
          <IconButton variant="soft" color="primary" size="sm">
            <Typography level="title-lg" sx={{ color: "#25D366" }}>
              💬
            </Typography>
          </IconButton>
          <Typography level="title-lg" sx={{ color: "#25D366" }}>
            {appName}
          </Typography>
        </Stack>
      </Link>

      <Stack direction="row" spacing={1} alignItems="center">
        <Select
          value={locale}
          onChange={(_, value) => {
            if (value) {
              const newLocale = value as LocalesValues
              const newUrl = getLocalizedUrl(location.pathname, newLocale)
              setLocale(newLocale)
              void navigate(newUrl)
            }
          }}
          size="sm"
          variant="outlined"
          startDecorator={<LanguageIcon sx={{ fontSize: "1.25rem" }} />}
          sx={{
            minWidth: 80,
            height: 36,
            "& .MuiSelect-button": {
              display: "flex",
              alignItems: "center",
              py: 0,
            },
            "& .MuiSelect-startDecorator": {
              mt: 0,
              mb: 0,
              display: "flex",
              alignItems: "center",
            },
          }}
          slotProps={{
            button: {
              sx: {
                borderRadius: "sm",
                height: "100%",
                py: 0,
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              },
            },
          }}
        >
          <Option value={LANGUAGES.EN}>EN</Option>
          <Option value={LANGUAGES.ES}>ES</Option>
        </Select>
        <ThemeToggleButton />
      </Stack>
    </Box>
  )
}
