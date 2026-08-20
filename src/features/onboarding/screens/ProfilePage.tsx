import { Edit, Person2 as Person2Icon } from "@mui/icons-material"
import {
  Box,
  Button,
  Card,
  CardActions,
  CardOverflow,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Option,
  Select,
  Stack,
  Typography,
} from "@mui/joy"
import { useState } from "react"
import { useIntlayer } from "react-intlayer"
import { useNavigate } from "react-router"
import { ROUTES_KEYS } from "../../../constants"
import type { RootState } from "../../../redux"
import {
  setBirthDate,
  setCustomGender,
  setErrors,
  setFirstName,
  setGender,
  setLastName,
  setNickname,
  useAppDispatch,
  useAppSelector,
  useCreateProfileParticipantMutation,
  validateProfile,
} from "../../../redux"

export const ProfilePage = () => {
  const {
    personalInfo,
    personalInfoDescription,
    nickname,
    firstName,
    lastName,
    gender,
    customGender,
    birthDate,
    male,
    female,
    other,
    custom,
    save,
    saving: savingLabel,
  } = useIntlayer("profile")

  const profile = useAppSelector((state: RootState) => state.profile)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const [createProfileParticipant, { isLoading: isSaving }] =
    useCreateProfileParticipantMutation()
  const [previewAvatar, setPreviewAvatar] = useState<string | null>(null)

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewAvatar(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = async () => {
    dispatch(validateProfile())

    const currentErrors = Object.keys(profile.errors).filter(
      key => profile.errors[key as keyof typeof profile.errors],
    )

    if (currentErrors.length > 0) {
      return
    }

    try {
      await createProfileParticipant({
        nickname: profile.nickname ?? "",
        first_name: profile.first_name ?? "",
        last_name: profile.last_name ?? "",
        gender: profile.gender ?? "",
        custom_gender: profile.custom_gender ?? "",
        birth_date: profile.birth_date ?? new Date(),
      }).unwrap()

      dispatch(setErrors({}))
      void navigate(ROUTES_KEYS.ONBOARDING)
    } catch (error: unknown) {
      console.error("Profile save error:", error)
    }
  }

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Main Content */}
      <Stack
        spacing={3}
        sx={{
          display: "flex",
          maxWidth: "800px",
          width: "100%",
          px: { xs: 2, md: 0 },
        }}
      >
        {/* Personal Info Card */}
        <Card>
          <Box sx={{ mb: 2 }}>
            <Typography level="title-md">{personalInfo as string}</Typography>
            <Typography level="body-sm">
              {personalInfoDescription as string}
            </Typography>
          </Box>
          <Divider />

          {/* Validation Errors Display */}
          {Object.entries(profile.errors).filter(([, error]) => error).length >
            0 && (
            <Box
              sx={{
                p: 1.5,
                mb: 2,
                bgcolor: "danger.softBg",
                borderRadius: "sm",
                border: "1px solid",
                borderColor: "danger.outlinedBorder",
              }}
            >
              <Typography
                level="body-sm"
                color="danger"
                sx={{ fontWeight: "600", mb: 0.5 }}
              >
                Please fix the following errors:
              </Typography>
              <Stack spacing={0.5}>
                {Object.entries(profile.errors)
                  .filter(([, error]) => error)
                  .map(([field, error]) => (
                    <Typography key={field} level="body-xs" color="danger">
                      • {error}
                    </Typography>
                  ))}
              </Stack>
            </Box>
          )}

          {/* Desktop View */}
          <Stack
            direction="column"
            spacing={3}
            sx={{
              display: { xs: "none", md: "flex" },
              my: 2,
              alignItems: "center",
            }}
          >
            {/* Avatar Section */}
            <Stack
              direction="column"
              spacing={1}
              sx={{ position: "relative", alignItems: "center" }}
            >
              <Box
                sx={{
                  width: 150,
                  height: 150,
                  borderRadius: "100%",
                  bgcolor: "neutral.softBg",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                {previewAvatar ? (
                  <img
                    src={previewAvatar}
                    alt="Profile avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                  />
                ) : (
                  <Person2Icon
                    sx={{
                      fontSize: "5rem",
                      color: "neutral.plainColor",
                    }}
                  />
                )}
              </Box>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                component="label"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  right: 0,
                  bottom: 0,
                  boxShadow: "sm",
                }}
              >
                <Edit />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
            </Stack>

            {/* Form Fields */}
            <Stack spacing={2} sx={{ flexGrow: 1, width: "100%" }}>
              {/* Nickname and Name */}
              <Stack spacing={1}>
                <FormLabel>{nickname as string}</FormLabel>
                <Input
                  size="sm"
                  placeholder="Nickname"
                  value={profile.nickname ?? ""}
                  onChange={e => dispatch(setNickname(e.target.value))}
                />
              </Stack>

              <Stack direction="row" spacing={2}>
                <FormControl sx={{ flex: 1 }}>
                  <FormLabel>{firstName as string}</FormLabel>
                  <Input
                    size="sm"
                    placeholder="First name"
                    value={profile.first_name ?? ""}
                    onChange={e => dispatch(setFirstName(e.target.value))}
                  />
                </FormControl>
                <FormControl sx={{ flexGrow: 1 }}>
                  <FormLabel>{lastName as string}</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Last name"
                    value={profile.last_name ?? ""}
                    onChange={e => dispatch(setLastName(e.target.value))}
                  />
                </FormControl>
              </Stack>

              {/* Gender */}
              <FormControl>
                <FormLabel>{gender as string}</FormLabel>
                <Select
                  size="sm"
                  value={profile.gender ?? ""}
                  onChange={(_, value) => {
                    if (value) {
                      dispatch(setGender(value))
                    }
                  }}
                >
                  <Option value="">{gender as string}</Option>
                  <Option value="MALE">{male as string}</Option>
                  <Option value="FEMALE">{female as string}</Option>
                  <Option value="NONE">{other as string}</Option>
                  <Option value="CUSTOM">{custom as string}</Option>
                </Select>
              </FormControl>

              {/* Custom Gender (if selected) */}
              {profile.gender === "custom" && (
                <FormControl>
                  <FormLabel>{customGender as string}</FormLabel>
                  <Input
                    size="sm"
                    placeholder="Specify your gender"
                    value={profile.custom_gender ?? ""}
                    onChange={e => dispatch(setCustomGender(e.target.value))}
                  />
                </FormControl>
              )}

              {/* Birth Date */}
              <FormControl>
                <FormLabel>{birthDate as string}</FormLabel>
                <Input
                  size="sm"
                  type="date"
                  value={
                    profile.birth_date
                      ? profile.birth_date.toISOString().split("T")[0]
                      : ""
                  }
                  onChange={e => {
                    if (e.target.value) {
                      dispatch(setBirthDate(new Date(e.target.value)))
                    }
                  }}
                />
              </FormControl>
            </Stack>
          </Stack>

          {/* Mobile View */}
          <Stack
            direction="column"
            spacing={2}
            sx={{ display: { xs: "flex", md: "none" }, my: 2 }}
          >
            {/* Avatar Section Mobile */}
            <Stack direction="row" spacing={2} sx={{ position: "relative" }}>
              <Box
                sx={{
                  width: 108,
                  height: 108,
                  borderRadius: "100%",
                  bgcolor: "neutral.softBg",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  overflow: "hidden",
                }}
              >
                {previewAvatar ? (
                  <img
                    src={previewAvatar}
                    alt="Profile avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "100%",
                    }}
                  />
                ) : (
                  <Box
                    sx={{
                      fontSize: "2rem",
                      color: "neutral.plainColor",
                    }}
                  >
                    👤
                  </Box>
                )}
              </Box>
              <IconButton
                aria-label="upload new picture"
                size="sm"
                variant="outlined"
                color="neutral"
                component="label"
                sx={{
                  bgcolor: "background.body",
                  position: "absolute",
                  zIndex: 2,
                  borderRadius: "50%",
                  left: 85,
                  top: 70,
                  boxShadow: "sm",
                }}
              >
                <Edit />
                <input
                  hidden
                  type="file"
                  accept="image/*"
                  onChange={handleAvatarChange}
                />
              </IconButton>
            </Stack>

            {/* Form Fields Mobile */}
            <FormControl>
              <FormLabel>{nickname as string}</FormLabel>
              <Input
                size="sm"
                placeholder="Nickname"
                value={profile.nickname ?? ""}
                onChange={e => dispatch(setNickname(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{firstName as string}</FormLabel>
              <Input
                size="sm"
                placeholder="First name"
                value={profile.first_name ?? ""}
                onChange={e => dispatch(setFirstName(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{lastName as string}</FormLabel>
              <Input
                size="sm"
                placeholder="Last name"
                value={profile.last_name ?? ""}
                onChange={e => dispatch(setLastName(e.target.value))}
              />
            </FormControl>

            <FormControl>
              <FormLabel>{gender as string}</FormLabel>
              <Select
                size="sm"
                value={profile.gender ?? ""}
                onChange={(_, value) => {
                  if (value) {
                    dispatch(setGender(value))
                  }
                }}
              >
                <Option value="">{gender as string}</Option>
                <Option value="male">{male as string}</Option>
                <Option value="female">{female as string}</Option>
                <Option value="other">{other as string}</Option>
                <Option value="custom">{custom as string}</Option>
              </Select>
            </FormControl>

            {profile.gender === "custom" && (
              <FormControl>
                <FormLabel>{customGender as string}</FormLabel>
                <Input
                  size="sm"
                  placeholder="Specify your gender"
                  value={profile.custom_gender ?? ""}
                  onChange={e => dispatch(setCustomGender(e.target.value))}
                />
              </FormControl>
            )}

            <FormControl>
              <FormLabel>{birthDate as string}</FormLabel>
              <Input
                size="sm"
                type="date"
                value={
                  profile.birth_date
                    ? profile.birth_date.toISOString().split("T")[0]
                    : ""
                }
                onChange={e => {
                  if (e.target.value) {
                    dispatch(setBirthDate(new Date(e.target.value)))
                  }
                }}
              />
            </FormControl>
          </Stack>

          {/* Action Buttons */}
          <CardOverflow sx={{ borderTop: "1px solid", borderColor: "divider" }}>
            <CardActions sx={{ justifyContent: "center", pt: 2 }}>
              <Button
                size="sm"
                variant="solid"
                color="success"
                onClick={() => {
                  void handleSave()
                }}
                loading={isSaving}
                disabled={isSaving}
              >
                {isSaving ? (savingLabel as string) : (save as string)}
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Stack>
    </Box>
  )
}
