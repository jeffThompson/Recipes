const buildRecipes = require('../buildRecipes');

describe('buildRecipes', () => {
  describe('prettyIngredientsSection', () => {
    const { __test__: { prettyIngredientsSection, NumericRegEx } } = buildRecipes;

    it('should add parens class (Happy Path)', () => {
      const html = `
<ul>
<li>tablespoons/85 grams unsalted butter (3/4 stick), melted</li>
<li>cup sweetened shredded coconut</li>
<li>large orange</li>
<li>large egg yolks</li>
<li>(14-ounce/400-gram) can sweetened condensed milk</li>
<li>cup/120 milliliters calamansi, extract or concentrate</li>
<li>tablespoons lemon or lime juice, to taste (from 1 lemon or lime) with zest</li>
</ul>
`;
      const expectedResult = `
<ul>
<li>tablespoons/85 grams unsalted butter <span class="paren">(3/4 stick)</span>, melted</li>
<li>cup sweetened shredded coconut</li>
<li>large orange</li>
<li>large egg yolks</li>
<li><span class="paren">(14-ounce/400-gram)</span> can sweetened condensed milk</li>
<li>cup/120 milliliters calamansi, extract or concentrate</li>
<li>tablespoons lemon or lime juice, to taste <span class="paren">(from 1 lemon or lime)</span> with zest</li>
</ul>
`;

      const result = prettyIngredientsSection(html);

      expect(result).toBe(expectedResult);
    });

    it('should markup items including amounts', () => {
      const html = `
<ul>
<li>6 tablespoons/85 grams unsalted butter</li>
<li>salt</li>
<li>1/2 cup sweetened shredded coconut</li>
<li>1 large orange</li>
<li>dash of white whine</li>
<li>1 can sweetened condensed milk</li>
<li>½ cup/120 milliliters calamansi</li>
<li>1 tablespoons lemon zest</li>
</ul>
`;
      const expectedResult = `
<ul>
<li class="ingredient--align"><span class="ingredient--amt">6</span> <span class="ingredient--text">tablespoons/85 grams unsalted butter</span></li>
<li>salt</li>
<li class="ingredient--align"><span class="ingredient--amt">1/2</span> <span class="ingredient--text">cup sweetened shredded coconut</span></li>
<li class="ingredient--align"><span class="ingredient--amt">1</span> <span class="ingredient--text">large orange</span></li>
<li>dash of white whine</li>
<li class="ingredient--align"><span class="ingredient--amt">1</span> <span class="ingredient--text">can sweetened condensed milk</span></li>
<li class="ingredient--align"><span class="ingredient--amt">½</span> <span class="ingredient--text">cup/120 milliliters calamansi</span></li>
<li class="ingredient--align"><span class="ingredient--amt">1</span> <span class="ingredient--text">tablespoons lemon zest</span></li>
</ul>
`;

      const result = prettyIngredientsSection(html);

      expect(result).toBe(expectedResult);
    });

    describe('NumericRegEx: catch amount syntaxes', () => {
      const Tests = [{
        input: '',
        expectedResult: '',
      },
      {
        input: '4 egg yolks',
        expectedResult: 'amount: 4, name: egg yolks',
      },
      {
        input: '6    egg yolks',
        expectedResult: 'amount: 6   , name: egg yolks',
      },
      {
        input: '~6\tegg yolks',
        expectedResult: 'amount: ~6, name: egg yolks',
      },
      {
        input: '1 3/4 - 2  egg yolks',
        expectedResult: 'amount: 1 3/4 - 2 , name: egg yolks',
      },
      {
        input: '1/2  egg yolks',
        expectedResult: 'amount: 1/2 , name: egg yolks',
      },
      {
        input: '1  (14-ounce) egg yolks',
        expectedResult: 'amount: 1 , name: (14-ounce) egg yolks',
      },
      {
        input: '½  egg yolks',
        expectedResult: 'amount: ½ , name: egg yolks',
      },
      {
        input: '1 to 2  egg yolks',
        expectedResult: 'amount: 1 to 2, name: egg yolks',
      },
      {
        input: '1 3/4 -2 ⅛ egg yolks',
        expectedResult: 'amount: 1 3/4 -2 ⅛, name: egg yolks',
      },
      {
        input: '2- 3 1/3  egg yolks',
        expectedResult: 'amount: 2- 3 1/3 , name: egg yolks',
      },
      {
        input: '1.5 oz egg yolks',
        expectedResult: 'amount: 1.5, name: oz egg yolks',
      }, {
        input: '3–4 whole chilies (em-dash)',
        expectedResult: 'amount: 3–4, name: whole chilies (em-dash)',
      }, {
        input: '1" piece of ginger',
        expectedResult: 'amount: 1", name: piece of ginger',
      }];

      Tests.forEach(({ input, expectedResult }) => {
        it(`should handle "${input.replace('egg yolks', '')}"`, () => {
          const matches = `<li>${input}</li>`
            .replace(NumericRegEx, 'amount: $1, name: $2')
            .replace(/<\/?li>/g, '');
          expect(matches).toEqual(expectedResult);
        });
      });
    });
  });
});
