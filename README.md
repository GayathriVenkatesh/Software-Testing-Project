**Software Testing Project Report**

The aim of this project is to perform extensive testing on any of the testing paradigms learnt in class so as to make the codebase more robust and bug-free.

**CODEBASE**

Music Blocks is an open source interactive web application written in JavaScript. It is a collection of manipulative tools for exploring musical and mathematical concepts in an integrative and fun way. More information on this can be found on the link above.

Code Link: [https://github.com/sugarlabs/musicblocks ](https://github.com/sugarlabs/musicblocks)Documentation: <https://github.com/sugarlabs/musicblocks#readme>

**Why did we choose open source?**

With over 100+ contributors, Music Blocks has a huge codebase spanning several 1000 lines of code. At such a large scale, it is very easy for errors to creep in and much harder to debug. Hence it becomes all the more vital for the software to be well tested and free from errors.

**File chosen:**

In the codebase, we chose to test [lilypond.js](https://github.com/sugarlabs/musicblocks/blob/master/js/lilypond.js), as it satisfies our requirement of 1000-2000 lines of code. Due to several interdependencies this file had with other files, **we made a few minor modifications to lilypond.js** without altering the functionality or the control flow. This was done so that we could spend all our efforts in testing the code rather than debugging all the other files in the repository.

**TESTING METHODOLOGY**

We have used **Mutation testing on source code**. Since the project is in JavaScript, we used **Stryker** to test the mutants.

**Mutation Operators used:**

1. Arithmetic Operator Replacement - Each occurrence of one of the arithmetic operators + and - is replaced by each of the other operators.
2. Relational Operator Replacement - Each occurrence of one of the relational operators (<, >, ≤, ≥, =, 6=) is replaced by each of the other operators and by falseOp and trueOp.
2. Conditional Operator Replacement - Each occurrence of each logical operator (and-&&, or-||, and with no conditional evaluation- &, or with no conditional evaluation- ǁ, not equivalent-) is replaced by each of the other operators. In addition, each is replaced by falseOp, trueOp, leftOp and rightOp.

**INSTRUCTIONS TO RUN THE CODE**

From the root directory, runnpm i and thennpm test to run the unit tests. Runnpx stryker run (after Stryker installation) to generate and kill mutants.

**RESULTS:**

We achieved a mutation score of **93.84%** on the source file.

Mutants that timeout are considered killed (for example, some mutants lead to creation of infinite loops). Mutants with no coverage are the ones without any corresponding tests.

**CHALLENGES:**

1. We could not 100% mutation score due to the generation of several **equivalent mutants.**
1. Local variables are hard to test. This needed the creation of a lot of additional functions, whose return value is assigned to the local variable.
1. It is difficult to write tests covering all the generated mutants.
1. Most of the variables in the codebase are of type ‘any’. This leads to many parts of the code being weakly typed and therefore their functionality can be wrongly manipulated. While testing, it was difficult to gauge the intended type and use of each variable and pass values accordingly.
