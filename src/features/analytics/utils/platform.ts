import { OperatingSystem, OperatingSystemType } from '@/shared/domain/operatingSystem'
import { BrowserType, BrowserTypeType } from '@/shared/domain/browserType'
import { DeviceType, DeviceTypeType } from '@/shared/domain/deviceType'

export function getOS(): OperatingSystemType {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('win')) return OperatingSystem.WINDOWS
  if (
    ua.includes('mac') &&
    !ua.includes('iphone') &&
    !ua.includes('ipad') &&
    !ua.includes('ipod')
  )
    return OperatingSystem.MACOS
  if (ua.includes('linux') && !ua.includes('android')) return OperatingSystem.LINUX
  if (ua.includes('android')) return OperatingSystem.ANDROID
  if (ua.includes('iphone') || ua.includes('ipad') || ua.includes('ipod')) return OperatingSystem.IOS
  return OperatingSystem.OTHER
}

export function getBrowser(): BrowserTypeType {
  const ua = navigator.userAgent.toLowerCase()
  if (ua.includes('opera') || ua.includes('opr')) return BrowserType.OPERA
  if (ua.includes('edge') || ua.includes('edg')) return BrowserType.EDGE
  if (ua.includes('chrome') && !ua.includes('chromium')) return BrowserType.CHROME
  if (ua.includes('safari') && !ua.includes('chrome') && !ua.includes('android'))
    return BrowserType.SAFARI
  if (ua.includes('firefox')) return BrowserType.FIREFOX
  return BrowserType.OTHER
}

export function getDeviceType(): DeviceTypeType {
  const ua = navigator.userAgent.toLowerCase()
  const isMobile = /mobile|iphone|ipad|ipod|android|blackberry|iemobile|opera mini/i.test(
    ua,
  )
  const isTablet =
    /(ipad|tablet|(android(?!.*mobile))|(windows(?!.*phone)(?=.*touch))|kindle|playbook|silk)/i.test(
      ua,
    )
  if (isTablet) return DeviceType.TABLET
  if (isMobile) return DeviceType.MOBILE
  return DeviceType.DESKTOP
}
