
#Python program to scrape website
#and save quotes from website
from selenium import webdriver
from bs4 import BeautifulSoup
import pandas as pd

driver = webdriver.Chrome("/usr/lib/chromium-browser/chromedriver")

courses = []
driver.get("https://apps.ualberta.ca/catalogue/course")


content = driver.page_source
soup = BeautifulSoup(content)
for a in soup.findAll('a', href=True,attrs={'class':'d-block'}):
    driver.get("https://apps.ualberta.ca"+a['href'])
    content2 = driver.page_source
    soup2 = BeautifulSoup(content2)
    for p in soup2.findAll('h2', attrs={'class':'[ fs-4 ][ flex-grow-1 ][ d-flex flex-column flex-md-row gap-2 ][ align-items-start align-items-md-center ]'}):
        courses.append(p.get_text())
df = pd.DataFrame({'Courses': courses}) 
df.to_csv('Courses.csv', index=True, encoding='utf-8')
