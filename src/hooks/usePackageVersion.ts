import { useState, useEffect } from 'react'

interface PackageInfo {
  version: string
  name: string
}

export const usePackageVersion = (): PackageInfo => {
  const [packageInfo, setPackageInfo] = useState<PackageInfo>({
    version: '0.0.0',
    name: 'gwan-ia'
  })

  useEffect(() => {
    const fetchPackageInfo = async () => {
      try {
        // Em desenvolvimento, podemos usar import.meta.env ou uma variável de ambiente
        // Em produção, isso seria servido pelo backend
        const response = await fetch('/api/package-info')
        if (response.ok) {
          const data = await response.json()
          setPackageInfo(data)
        }
      } catch (error) {
        // Fallback para desenvolvimento - usar versão padrão
        console.log('Usando versão de desenvolvimento')
      }
    }

    fetchPackageInfo()
  }, [])

  return packageInfo
}

// Versão alternativa para desenvolvimento local
export const getLocalPackageVersion = (): string => {
  // Em desenvolvimento, podemos usar uma variável de ambiente
  // ou ler diretamente do package.json se estiver disponível
  return '0.0.0'
}
