export type ProjectAssetType = 'imagen' | 'pdf'

export interface ProjectAsset {
    id: string
    path: string
    url: string
}

export interface ProjectAssetsResponse {
    data: ProjectAsset[]
}
