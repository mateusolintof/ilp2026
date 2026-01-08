/**
 * Script de Extração de Dados Orgânicos
 *
 * Este script lê os CSVs de tráfego orgânico (Feed/Reels e Stories)
 * e estrutura os dados para análise
 */

import * as fs from 'fs';
import * as path from 'path';
import { OrganicPost, OrganicMetrics, OrganicPostType, OrganicSummary } from '../src/types';

const DATA_PATH = path.join(__dirname, '../data/relatorios-organico');
const OUTPUT_PATH = path.join(__dirname, '../src/lib/data');

// Função para parsear CSV (lida com campos multiline)
function parseCSV(content: string): Record<string, string>[] {
  // Remove BOM se existir
  const cleanContent = content.replace(/^\uFEFF/, '');

  const data: Record<string, string>[] = [];
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;

  for (let i = 0; i < cleanContent.length; i++) {
    const char = cleanContent[i];
    const nextChar = cleanContent[i + 1];

    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        // Escaped quote
        currentField += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField.trim());
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // Skip \n in \r\n
      }
      if (currentField || currentRow.length > 0) {
        currentRow.push(currentField.trim());
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      }
    } else {
      currentField += char;
    }
  }

  // Push last row if exists
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField.trim());
    rows.push(currentRow);
  }

  if (rows.length < 2) return [];

  const headers = rows[0].map(h => h.replace(/"/g, '').trim());

  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    const row: Record<string, string> = {};

    headers.forEach((header, index) => {
      row[header] = values[index]?.replace(/"/g, '').trim() || '';
    });

    data.push(row);
  }

  return data;
}

// Função para converter valor numérico
function parseNumber(value: string): number {
  if (!value || value === '-' || value === '') return 0;
  const cleaned = value.replace(/\./g, '').replace(',', '.');
  return parseFloat(cleaned) || 0;
}

// Função para determinar o tipo de post
function getPostType(typeStr: string): OrganicPostType {
  const upper = typeStr.toUpperCase();
  if (upper.includes('REEL')) return 'REEL';
  if (upper.includes('CARROSSEL') || upper.includes('CAROUSEL')) return 'CAROUSEL';
  if (upper.includes('STORY')) return 'STORY';
  return 'IMAGE';
}

// Função para extrair métricas
function extractOrganicMetrics(row: Record<string, string>): OrganicMetrics {
  return {
    views: parseNumber(row['Visualizações'] || row['Views'] || '0'),
    reach: parseNumber(row['Alcance'] || row['Reach'] || '0'),
    likes: parseNumber(row['Curtidas'] || row['Likes'] || '0'),
    shares: parseNumber(row['Compartilhamentos'] || row['Shares'] || '0'),
    comments: parseNumber(row['Comentários'] || row['Comments'] || '0'),
    saves: parseNumber(row['Salvamentos'] || row['Saves'] || '0'),
    replies: parseNumber(row['Respostas'] || row['Replies'] || '0'),
    stickerTaps: parseNumber(row['Toques em figurinhas'] || row['Sticker taps'] || '0'),
    navigation: parseNumber(row['Navegação'] || row['Navigation'] || '0'),
    profileVisits: parseNumber(row['Visitas ao perfil'] || row['Profile visits'] || '0'),
    linkClicks: parseNumber(row['Cliques no link'] || row['Link clicks'] || '0'),
    follows: parseNumber(row['Seguimentos'] || row['Follows'] || '0'),
  };
}

// Função para processar arquivo CSV
function processOrganicFile(filePath: string, isStories: boolean): OrganicPost[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const rows = parseCSV(content);
  const posts: OrganicPost[] = [];

  for (const row of rows) {
    const postId = row['Identificação do post'] || row['Post ID'] || '';
    if (!postId) continue;

    const typeStr = row['Tipo de post'] || row['Post type'] || '';

    const post: OrganicPost = {
      id: postId,
      accountId: row['Identificação da conta'] || row['Account ID'] || '',
      accountName: row['Nome da conta'] || row['Account name'] || 'Instituto Luciane Prado',
      description: row['Descrição'] || row['Description'] || '',
      type: isStories ? 'STORY' : getPostType(typeStr),
      publishedAt: row['Horário de publicação'] || row['Publish time'] || '',
      permanentLink: row['Link permanente'] || row['Permalink'] || '',
      duration: parseNumber(row['Duração (s)'] || row['Duration'] || '0'),
      metrics: extractOrganicMetrics(row),
    };

    posts.push(post);
  }

  return posts;
}

// Função principal de extração
async function extractOrganic(): Promise<void> {
  console.log('🚀 Iniciando extração de dados orgânicos...\n');

  const feedReelsPosts: OrganicPost[] = [];
  const storiesPosts: OrganicPost[] = [];

  const files = fs.readdirSync(DATA_PATH).filter(f => f.endsWith('.csv'));

  console.log(`📁 Arquivos encontrados: ${files.length}`);

  for (const file of files) {
    const filePath = path.join(DATA_PATH, file);
    const isStories = file.toUpperCase().includes('STORIES');

    console.log(`  📄 Processando: ${file} (${isStories ? 'Stories' : 'Feed/Reels'})`);

    try {
      const posts = processOrganicFile(filePath, isStories);

      if (isStories) {
        storiesPosts.push(...posts);
      } else {
        feedReelsPosts.push(...posts);
      }

      console.log(`     ✓ ${posts.length} posts extraídos`);
    } catch (error) {
      console.log(`     ✗ Erro ao processar: ${error}`);
    }
  }

  console.log(`\n📊 Total de posts:`);
  console.log(`   - Feed/Reels: ${feedReelsPosts.length}`);
  console.log(`   - Stories: ${storiesPosts.length}`);

  // Calcular métricas consolidadas - Feed/Reels
  const feedReelsSummary = {
    totalPosts: feedReelsPosts.length,
    totalViews: feedReelsPosts.reduce((sum, p) => sum + p.metrics.views, 0),
    totalReach: feedReelsPosts.reduce((sum, p) => sum + p.metrics.reach, 0),
    totalLikes: feedReelsPosts.reduce((sum, p) => sum + p.metrics.likes, 0),
    totalShares: feedReelsPosts.reduce((sum, p) => sum + p.metrics.shares, 0),
    totalComments: feedReelsPosts.reduce((sum, p) => sum + (p.metrics.comments || 0), 0),
    totalSaves: feedReelsPosts.reduce((sum, p) => sum + (p.metrics.saves || 0), 0),
    avgEngagement: 0,
  };

  if (feedReelsSummary.totalReach > 0) {
    const totalEngagements = feedReelsSummary.totalLikes + feedReelsSummary.totalComments +
      feedReelsSummary.totalShares + feedReelsSummary.totalSaves;
    feedReelsSummary.avgEngagement = (totalEngagements / feedReelsSummary.totalReach) * 100;
  }

  // Calcular métricas consolidadas - Stories
  const storiesSummary = {
    totalStories: storiesPosts.length,
    totalViews: storiesPosts.reduce((sum, p) => sum + p.metrics.views, 0),
    totalReach: storiesPosts.reduce((sum, p) => sum + p.metrics.reach, 0),
    totalReplies: storiesPosts.reduce((sum, p) => sum + (p.metrics.replies || 0), 0),
    totalStickerTaps: storiesPosts.reduce((sum, p) => sum + (p.metrics.stickerTaps || 0), 0),
    avgCompletion: 0,
  };

  // Top posts por visualizações
  const topFeedReels = [...feedReelsPosts]
    .sort((a, b) => b.metrics.views - a.metrics.views)
    .slice(0, 10);

  const topStories = [...storiesPosts]
    .sort((a, b) => b.metrics.views - a.metrics.views)
    .slice(0, 10);

  // Análise por tipo
  const byType = {
    reels: feedReelsPosts.filter(p => p.type === 'REEL').length,
    carousel: feedReelsPosts.filter(p => p.type === 'CAROUSEL').length,
    image: feedReelsPosts.filter(p => p.type === 'IMAGE').length,
  };

  // Criar diretório de saída
  if (!fs.existsSync(OUTPUT_PATH)) {
    fs.mkdirSync(OUTPUT_PATH, { recursive: true });
  }

  // Salvar dados estruturados
  const outputData = {
    extractedAt: new Date().toISOString(),
    summary: {
      feedReels: feedReelsSummary,
      stories: storiesSummary,
      byType,
    },
    topPerformers: {
      feedReels: topFeedReels,
      stories: topStories,
    },
    posts: {
      feedReels: feedReelsPosts,
      stories: storiesPosts,
    },
  };

  const outputFile = path.join(OUTPUT_PATH, 'organic.ts');
  const tsContent = `// Dados Orgânicos - Gerado automaticamente
// Última atualização: ${new Date().toISOString()}

import { OrganicPost } from '@/types';

export const organicData = ${JSON.stringify(outputData, null, 2)} as const;

export const feedReelsPosts: OrganicPost[] = organicData.posts.feedReels;
export const storiesPosts: OrganicPost[] = organicData.posts.stories;

export const topFeedReelsPosts = organicData.topPerformers.feedReels;
export const topStoriesPosts = organicData.topPerformers.stories;

export const organicSummary = organicData.summary;
`;

  fs.writeFileSync(outputFile, tsContent);
  console.log(`\n✅ Dados salvos em: ${outputFile}`);

  // Resumo
  console.log('\n📈 RESUMO CONSOLIDADO:');
  console.log('\n   FEED/REELS:');
  console.log(`   - Total de Posts: ${feedReelsSummary.totalPosts}`);
  console.log(`   - Visualizações: ${feedReelsSummary.totalViews.toLocaleString()}`);
  console.log(`   - Alcance: ${feedReelsSummary.totalReach.toLocaleString()}`);
  console.log(`   - Curtidas: ${feedReelsSummary.totalLikes.toLocaleString()}`);
  console.log(`   - Taxa de Engajamento: ${feedReelsSummary.avgEngagement.toFixed(2)}%`);

  console.log('\n   STORIES:');
  console.log(`   - Total de Stories: ${storiesSummary.totalStories}`);
  console.log(`   - Visualizações: ${storiesSummary.totalViews.toLocaleString()}`);
  console.log(`   - Alcance: ${storiesSummary.totalReach.toLocaleString()}`);
  console.log(`   - Respostas: ${storiesSummary.totalReplies}`);

  console.log('\n🏆 TOP 5 POSTS FEED/REELS:');
  topFeedReels.slice(0, 5).forEach((p, i) => {
    console.log(`   ${i + 1}. ${p.description.substring(0, 50)}...`);
    console.log(`      Views: ${p.metrics.views} | Likes: ${p.metrics.likes}`);
  });
}

// Executar
extractOrganic().catch(console.error);
