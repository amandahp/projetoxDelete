from flask import Flask, jsonify, request, json
from flask_cors import CORS, cross_origin

import pymysql
import mariadb
import sys

app = Flask(__name__)


def connect_to_db():
    try:
        conn = mariadb.connect(
        user="root",
        password="229729",
        host="localhost",
        port=3306,
        database ="projetoxxback"
        )
        
        print("Sucess")
        
        
        return conn
    
    except mariadb.Error as e:
        print("Error connecting to MariaDB")
        print (e)
        sys.exit(1)



@app.route("/", methods=['POST', 'GET'])
@cross_origin()
def index():
    if request.method == "POST":
        print("aqui")
        details = request.get_json()
        name = details['name']
        conn = connect_to_db()
        cur = conn.cursor()
        sql="INSERT INTO projetoxx(name) values('{}')".format(name)
        cur.execute(sql)
        conn.commit()
        conn.close()
        return 'sucessPost'
    if request.method == "GET":
        print("aqui")
        conn = connect_to_db()
        cur = conn.cursor()
        sql = " SELECT name FROM projetoxx"
        cur.execute(sql)
        data = cur.fetchall()
        res = [''.join(i) for i in data]
        print(res)

        conn.close()
       

    
        return  json.dumps(res)



    
@app.route("/deletar", methods= ['POST'])
@cross_origin()
def delete(): 
    if request.method == 'POST':
        details = request.get_json()
        print(details)
        name = details['name']
        conn = connect_to_db()
        cur = conn.cursor()
        for n in name: 
            # name.forEach((n)=>{
                #sql = 'de...'
            #})
            #
             sql = "DELETE FROM projetoxx WHERE name = %s"
             cur.execute(sql,(n,))
        conn.commit()
  
        conn.close()
        print('meo deos')
    
        return 'sucess'

    
    
        
    
        

if __name__ =='__main__':
    app.run() 
    print("aqui")



