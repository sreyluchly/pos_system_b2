type SidebarContextType = {
  collapse: boolean
  toggle: () => void
  children?: ReactNode
}

type MenuItem = {
  label: string
  href: string
  icon: React.ElementType
}

type Stat = {
  title: string
  value: number
  icon: React.ElementType
  color?: string
}