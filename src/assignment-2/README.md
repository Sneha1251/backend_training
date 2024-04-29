# Setting Up Postman and Creating a GET API

## Setting Up Postman

To install and set up the latest stable version of Postman, follow these steps:

1. Open a terminal.

2. Add the Postman repository by running the following command:

   ```bash
   sudo sh -c 'echo "deb https://dl.pstmn.io/download/latest/linux64" > /etc/apt/sources.list.d/postman.list'
   ```

3. Import the Postman GPG Key with the following command:

   ```bash
   sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61
   ```

4. Update the package list:

   ```bash
   sudo apt-get update
   ```

5. Install Postman:

   ```bash
   sudo apt-get install postman
   ```
