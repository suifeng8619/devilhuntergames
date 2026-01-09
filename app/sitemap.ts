import { MetadataRoute } from 'next'
import { getAllContracts, getAllTalents } from '@/lib/content'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://devilhuntergames.com'

  // Get all contracts for dynamic routes
  const contracts = getAllContracts()
  const contractUrls = contracts.map((contract) => ({
    url: `${baseUrl}/database/contracts/${contract.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // Get all talents for dynamic routes
  const talents = getAllTalents()
  const talentUrls = talents.map((talent) => ({
    url: `${baseUrl}/database/talents/${talent.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))

  return [
    // Homepage - highest priority
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    // Quick Start - second highest priority (critical for new users)
    {
      url: `${baseUrl}/quick-start`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Build Planner - key differentiator
    {
      url: `${baseUrl}/builds/planner`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    // Database pages
    {
      url: `${baseUrl}/database/contracts`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/database/talents`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    // All contract detail pages
    ...contractUrls,
    // All talent detail pages
    ...talentUrls,
  ]
}
