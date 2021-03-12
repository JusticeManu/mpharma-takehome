## 🚀 GETTING A LOCAL COPY

Clone the repository if this is your first time.

```
$ git clone https://github.com/JusticeManu/mpharma-takehome.git
```

## 🚀 BRANCHING/GIT STUFF

This repository consists of server **master** branche.
master is where we deploy from and you will usually not work from here.
dev branch is the branch that you will mostly create **PR** against.

**1. To work on this project you can create a new branch and navigate into the new branch**

```
git checkout origin/branchname
```

**2. Get latest changes by running this command(\***This is very important and will solve a lot of merge conflicts**\*)
Don't forget this step**

```
git pull origin branchname
```

**3. create your own branch(preferably should be of the feature you are working on) while still
in the new branch**

Example.

```
git checkout -b mpharma-EditForm
```

after working on your branch, push the branch you worked on and raise a **PR**

Example

```
git push origin mpharma-EditForm
```

Now raise a PR from the branch you pushed(eg: **_connect-auth-to-backend_**) to the **dev** branch

Wait for code review and merge. You can now delete your branch and create a new one
reflecting the new feature that you will work on.



## 🚀 RUNNING THE PROJECT)

```
$ cd mpharma
$ npm install
$ npm run start
```

Everything else has been setup and should work accordingly 😀

**HAPPY HACKING**
