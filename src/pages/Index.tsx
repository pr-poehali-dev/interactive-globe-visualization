import { useState } from 'react';
import Globe from '@/components/Globe';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ContinentInfo {
  name: string;
  area: string;
  population: string;
  countries: number;
  description: string;
  icon: string;
}

const continentData: Record<string, ContinentInfo> = {
  'Africa': {
    name: 'Африка',
    area: '30.37 млн км²',
    population: '1.4 млрд',
    countries: 54,
    description: 'Второй по величине континент, родина человечества с богатым биоразнообразием и древнейшими цивилизациями.',
    icon: 'Palmtree'
  },
  'Europe': {
    name: 'Европа',
    area: '10.18 млн км²',
    population: '748 млн',
    countries: 44,
    description: 'Континент с богатой историей, культурным наследием и развитой экономикой.',
    icon: 'Castle'
  },
  'Asia': {
    name: 'Азия',
    area: '44.58 млн км²',
    population: '4.7 млрд',
    countries: 48,
    description: 'Крупнейший континент с самым большим населением, колыбель древних цивилизаций.',
    icon: 'Mountain'
  },
  'North America': {
    name: 'Северная Америка',
    area: '24.71 млн км²',
    population: '592 млн',
    countries: 23,
    description: 'Континент контрастов: от арктических тундр до тропических лесов Центральной Америки.',
    icon: 'Trees'
  },
  'South America': {
    name: 'Южная Америка',
    area: '17.84 млн км²',
    population: '434 млн',
    countries: 12,
    description: 'Континент Амазонки, Анд и удивительного биоразнообразия.',
    icon: 'TreePine'
  },
  'Australia': {
    name: 'Австралия и Океания',
    area: '8.6 млн км²',
    population: '43 млн',
    countries: 14,
    description: 'Уникальный континент с эндемичными видами животных и древнейшими культурами.',
    icon: 'Waves'
  },
  'Antarctica': {
    name: 'Антарктида',
    area: '14.2 млн км²',
    population: '1-5 тыс (временно)',
    countries: 0,
    description: 'Ледяной континент, посвященный науке и исследованиям, покрытый 98% льда.',
    icon: 'Snowflake'
  }
};

export default function Index() {
  const [selectedContinent, setSelectedContinent] = useState<string | null>(null);

  const currentInfo = selectedContinent ? continentData[selectedContinent] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#1e293b] to-[#0f172a] overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-5xl md:text-7xl font-heading font-bold text-foreground mb-4 tracking-tight">
            Планета Земля
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Интерактивный глобус с информацией о континентах и географии
          </p>
        </header>

        <div className="grid lg:grid-cols-2 gap-8 items-start max-w-7xl mx-auto">
          <div className="flex justify-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <div className="w-full max-w-2xl aspect-square bg-card/30 backdrop-blur-sm rounded-2xl border border-border/50 shadow-2xl p-8 hover:shadow-primary/20 transition-shadow duration-500">
              <Globe onContinentClick={setSelectedContinent} />
            </div>
          </div>

          <div className="space-y-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            {currentInfo ? (
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl animate-scale-in">
                <CardHeader>
                  <div className="flex items-center gap-4 mb-2">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Icon name={currentInfo.icon as any} size={32} className="text-primary" />
                    </div>
                    <CardTitle className="text-3xl font-heading">{currentInfo.name}</CardTitle>
                  </div>
                  <CardDescription className="text-base">{currentInfo.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Maximize2" size={16} className="text-primary" />
                        <p className="text-sm text-muted-foreground">Площадь</p>
                      </div>
                      <p className="text-lg font-semibold">{currentInfo.area}</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Users" size={16} className="text-primary" />
                        <p className="text-sm text-muted-foreground">Население</p>
                      </div>
                      <p className="text-lg font-semibold">{currentInfo.population}</p>
                    </div>
                    <div className="bg-background/50 rounded-lg p-4 col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <Icon name="Flag" size={16} className="text-primary" />
                        <p className="text-sm text-muted-foreground">Стран</p>
                      </div>
                      <p className="text-lg font-semibold">{currentInfo.countries}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
                <CardHeader>
                  <CardTitle className="text-2xl font-heading">Добро пожаловать!</CardTitle>
                  <CardDescription className="text-base">
                    Нажмите на любой континент на глобусе, чтобы узнать о нем больше
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icon name="MousePointerClick" size={20} className="text-primary" />
                      <p>Кликните по континенту для просмотра информации</p>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icon name="Hand" size={20} className="text-primary" />
                      <p>Перетаскивайте глобус для вращения</p>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Icon name="Sparkles" size={20} className="text-primary" />
                      <p>Наведите курсор на континент для подсветки</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl font-heading flex items-center gap-2">
                  <Icon name="Globe" size={24} className="text-primary" />
                  Интересные факты
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">На Земле 7 континентов и 5 океанов</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">71% поверхности планеты покрыто водой</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">Население Земли превышает 8 миллиардов человек</p>
                </div>
                <div className="flex gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                  <p className="text-muted-foreground">Самый большой континент — Азия (30% суши)</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
