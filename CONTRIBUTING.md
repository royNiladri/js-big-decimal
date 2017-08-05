After forking, checkout the `development` branch to ensure you are starting with the lastest code.
All the source code resides in folder __src__.

Use npm start to fire up the dev environment.
```
npm start
```
It will:
1. Watch the src folder for changes and run typescript compiler to generate js files under `lib`,
2. Run tests whenever any file under `lib` changes (which happens after step 1),
3. Bundles the code into single files under `dist` folder.

Use typescript to write your source files and link it to the base class BigDecimal.ts appropriately. Write enough specs to test your code.
[Try to write tests before writing the implementation]. Test files have an ectention of `.spec.ts`.

