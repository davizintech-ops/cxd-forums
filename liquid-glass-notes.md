# Direção Liquid Glass aplicada ao CXD

A referência visual fornecida pelo usuário foi combinada com a documentação oficial da Apple consultada em 15/10/2026.

A adaptação seguirá três ideias principais: navegação flutuante acima do conteúdo, superfícies translúcidas com desfoque e separação clara entre camadas. A interface do fórum não será uma cópia do iOS; ela manterá a identidade CXD e usará o padrão apenas como inspiração para a geometria e para o comportamento dos elementos.

## Aplicação no projeto

- Arredondar seções, cartões, inputs e ações com um raio consistente, maior no mobile.
- Transformar a navegação inferior em uma cápsula flutuante com material translúcido.
- Usar `backdrop-filter` com fallback sólido para celulares que não suportam blur.
- Criar bordas suaves e reflexos discretos em vez de sombras pesadas.
- Manter os títulos e o conteúdo do fórum em camadas sólidas, garantindo contraste e leitura.
- Aplicar movimento curto e orgânico apenas em entrada, hover e mudança de estado.

## Referências

- Apple — Adopting Liquid Glass: https://developer.apple.com/documentation/technologyoverviews/adopting-liquid-glass
- Apple Newsroom — A new software design: https://www.apple.com/newsroom/2025/06/apple-introduces-a-delightful-and-elegant-new-software-design/
- Apple Human Interface Guidelines — Materials: https://developer.apple.com/design/human-interface-guidelines/materials
