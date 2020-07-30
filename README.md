# Hozz - Wett Framework Cli & Project Architecture / Structure Guide

hozz is a architecture for wett javascript framework, with primary purpose of standardizing node js apis Structure for easy development cycle.

best javascript backend framework, organising and structuring tools.

## Best Practises

- always use db operations with functions declared in the io directory add the io functions with the index using module.exports
- always use new keys before going to production to make sessions secure.
- follow the given wett modules structure to the tee it makes dev on boarding and dev cycle easy
- always use wett loggs for easy debugging.
- functions which are needed to be used with multiple apis should be used as seprate modules and be declared in elective directory and exported with module.exports in the index file.
- please update wett api manually on regular interval we dont update it automatically.
- all global modules like databases or file storage should be activated before the app initaiater is called in the index file in the app directory, follow all the guidence given in the file for structuing your code.

## Init

this command initiates a new project with the name given in the cli

`$ hozz init akku`

## Generate

this command generates wett modules

` $ hozz generate `

### Wett Modules

wett is a api framework, to give a easy structure to your backend, hozz uses modules to guide the developers through a location based system for organising your projects.

these modules are nested within with a tree structure

    --app
        --api
            --method


#### App - Module
usually all the apps nowdays support multiple platforms, to organize platform specific or usergroup specific apis, top level module - app seprates apis for backend, web, frontend, android, cordova, android, ios or platform specific apis.

#### Api - Module
each app needs to login, serve content and do user specific functions like login, singup, messaging api for ios or android.

#### Method - Module
methods are simple io operations like messaging may have both incoming and outgoing methods such diffrent methods can be separted into  diffrent files for easy navigation and code management

##### Module Structure

    Apps :-
        -ios
            Apis :-
                -login
                    Methods :-
                        -get
                        -set
                        -update
                -post
                -stream
         -android
         -backend

## Serve

this launches your app in development mode with live reloading on file changes and you can also press enter once your app is launched to restart the app.

` $ hozz serve `

## Keys

this api makes rsa keys for wett sessions thses keys can be found in secure folder => wett_keys.json and are already included in the project, before production deploy please make new keys

` $ hozz keys generate `

to remake keys

` $ hozz keys remake `

**caution
remake commands replaces your old keys.

## Founder
just in case you want to reach out to me.
` $ hozz founder `
