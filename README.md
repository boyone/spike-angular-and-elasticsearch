spike-angular-and-elasticsearch
===============================

download : https://download.elasticsearch.org/elasticsearch/elasticsearch/elasticsearch-version.tar.gz

start : ELASTICSEARCH_HOME/bin/elasticsearch

default url : http://localhost:9200

health check : http://localhost:9200/_cat/health?v

list all indexes : http://localhost:9200/_cat/indices?v
-------------------------------------------------
create index:
curl -XPUT http://localhost:9200/customer

create document:
curl -XPUT http://localhost:9200/customer/external/_mapping -d '{
"external": {
    "properties": {
      "name": {"type": "string", "analyzer": "thai"}  
    }
  }
}'

test word wrap:
http://localhost:9200/customer/_analyze?analyzer=thai&text=ประเทศไทย&pretty


insert data via REST Console [PUT]:
-------------------------------------------------
http://localhost:9200/customer/external/1?pretty
{
          "name": "รักไทย"
}

http://localhost:9200/customer/external/2?pretty
{
          "name": "ไทยรัฐ"
}

http://localhost:9200/customer/external/3?pretty
{
          "name": "สมรัก"
}

http://localhost:9200/customer/external/3?pretty
{
          "name": "สมไทย"
}
-------------------------------------------------

or insert data via CURL:
curl -XPUT http://localhost:9200/customer/external/1?pretty -d '{
          "name": "รักไทย"
}'
curl -XPUT http://localhost:9200/customer/external/2?pretty -d '{
          "name": "ไทยรัฐ"
}'
curl -XPUT http://localhost:9200/customer/external/3?pretty -d '{
          "name": "สมรัก"
}'
curl -XPUT http://localhost:9200/customer/external/4?pretty -d '{
          "name": "สมไทย"
}'
-------------------------------------------------

search with POST:
http://localhost:9200/customer/_search?pretty
{"query":{"match":{"name": "ไทย"}}}

http://localhost:9200/customer/_search?pretty
{"query":{"match":{"name": "สม"}}}


search with GET:
http://localhost:9200/_search?q=name:ไทย&pretty=true
http://localhost:9200/_search?q=name:สม&pretty=true
