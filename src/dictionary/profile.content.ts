import { type Dictionary, t } from "intlayer"

const profileContent = {
  key: "profile",
  content: {
    title: t({
      en: "My Profile",
      es: "Mi Perfil",
    }),
    personalInfo: t({
      en: "Personal Information",
      es: "Información Personal",
    }),
    personalInfoDescription: t({
      en: "Customize how your profile information will appear to other users.",
      es: "Personaliza cómo aparecerá tu información de perfil a otros usuarios.",
    }),
    nickname: t({
      en: "Nickname",
      es: "Apodo",
    }),
    firstName: t({
      en: "First Name",
      es: "Nombre",
    }),
    lastName: t({
      en: "Last Name",
      es: "Apellido",
    }),
    gender: t({
      en: "Gender",
      es: "Género",
    }),
    customGender: t({
      en: "Custom Gender",
      es: "Género Personalizado",
    }),
    birthDate: t({
      en: "Birth Date",
      es: "Fecha de Nacimiento",
    }),
    avatar: t({
      en: "Avatar",
      es: "Avatar",
    }),
    changeAvatar: t({
      en: "Change Avatar",
      es: "Cambiar Avatar",
    }),
    male: t({
      en: "Male",
      es: "Masculino",
    }),
    female: t({
      en: "Female",
      es: "Femenino",
    }),
    other: t({
      en: "Other",
      es: "Otro",
    }),
    custom: t({
      en: "Custom",
      es: "Personalizado",
    }),
    save: t({
      en: "Save",
      es: "Guardar",
    }),
    saving: t({
      en: "Saving...",
      es: "Guardando...",
    }),
    updateSuccess: t({
      en: "Profile updated successfully",
      es: "Perfil actualizado exitosamente",
    }),
    updateError: t({
      en: "Error updating profile",
      es: "Error al actualizar el perfil",
    }),
    loadingError: t({
      en: "Error loading profile",
      es: "Error al cargar el perfil",
    }),
    requiredField: t({
      en: "This field is required",
      es: "Este campo es obligatorio",
    }),
  },
} satisfies Dictionary

export default profileContent
