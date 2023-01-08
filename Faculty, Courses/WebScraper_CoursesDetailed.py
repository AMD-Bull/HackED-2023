
#Python program to scrape website
#and save quotes from website
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd
import json

driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver")

courses = {}

driver.get("https://apps.ualberta.ca/catalogue/course")


content = driver.page_source
soup = BeautifulSoup(content)
for a in soup.findAll('a', href=True,attrs={'class':'d-block'}):
    driver.get("https://apps.ualberta.ca"+a['href'])
    content2 = driver.page_source
    soup2 = BeautifulSoup(content2)
    for p in soup2.findAll('a', attrs={'class':'btn btn-sm btn-secondary text-nowrap'}):
        driver.get("https://apps.ualberta.ca"+p['href'])
        content3 = driver.page_source
        soup3 = BeautifulSoup(content3)
        course = soup3.find('h1', attrs={'class':'m-0'}).get_text()
        print(course)
        desc_temp = soup3.findAll('p')
        desc = ""
        if(len(desc_temp)>=2):
            desc = " ".join(soup3.findAll('p')[1].get_text().replace("\n",'').split())
        _sections = soup3.findAll('td', attrs={'data-card-title':'Section'})
        _datetimes = soup3.findAll('td', attrs={'data-card-title':'Dates + Times'})
        _instructors = soup3.findAll('td', attrs={'data-card-title':'Instructor(s)'})

        temp = []
        for i in range(len(_sections)):
            temp2 = []
            temp2.append(" ".join(_sections[i].get_text().replace("\n",'').split()))
            temp2.append(" ".join(_datetimes[i].get_text().replace("\n",'').split()))
            temp2.append(_instructors[i].get_text().replace("Primary Instructor:  ",'').strip())
            temp.append(temp2)
        courses[course] = [desc,temp]

with open('json_data.json', 'w') as outfile:
    data = []
    for course in courses.keys():
            for p in courses[course][1]:
                data.append([{"Course":course,"Description":courses[course][0],"Section":p[0],"Date Times":p[1],"Instructors":p[2]}])
    json.dump(data, outfile)
