# Challenge

Given a dataset with the following columns (provided in the .zip we sent)

* device_id
* lat
* lng
* timestamp (unix timestamp)

that records the advertisement views (in the advertisement slang, they are called "impressions") coming from mobile devices, build a web application (and optionally the API serving the necessary data) that answers the following questions:

* How many impressions are coming from each device?
* How many impressions for each hour of the day?
* How many impressions for each US state? (no geocoding needed, the provided `map.json` file should be enough for a map visualization)
* Black friday impression rate through the years

# Requirements

* You should send your project as a .zip file containing everything needed to run your code, including a `README.md` file and a way to launch it. 
* The project should also contain a git repo, remember to run `git init` at the beginning and progressively commit your changes.
* The project should adhere to modern practices in web development, accounting not only for working code but also ensuring its quality, readibility, ease of use and standardization. 
* You don't need to use third party APIs to complete the assignment 

## Client

* React would be highly preferred, but use the framework you feel confident the most
* Typescript usage is a must
* Interactive visualizations are strongly preferred

## API (optional)

* Use a language (and/or framework) of your choice: for the language we would gladly prefer TypeScript, Java or Kotlin
* An actual DB is not necessary
* Same assumptions about code quality and modern standards apply to API as well

# Evaluation insights

We value a lot the following things:

* Robust application of TypeScript features
* Clean code, design and project structure
* Asynchronous patterns
* Error handling
* UX sensibility
* Testing

# Bonus points

* API serving the dataset (instead of having it harcoded in the client project)
* How many impressions for each day of the week/month?
* Multiple visualizations for the same metric

# Notes

* You can use third party libraries (eg. visualization, UI design systems, utilities): just ensure that the core application demonstrates your skills (not the lib developer ones :D)
