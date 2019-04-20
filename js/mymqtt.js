var hostname = 'lovemin.info',
    port = 8084,
    clientId = 'websocket_web_js',
    timeout = 5,
    keepAlive = 100,
    cleanSession = false,
    ssl = true;
    // userName = 'mao2080',
    // password = '123',
var client = new Paho.MQTT.Client(hostname, port, clientId);
//建立客户端实例
var isConnect=false;
var options = {
    invocationContext: {
        host: hostname,
        port: port,
        path: client.path,
        clientId: clientId
    },
    timeout: timeout,
    keepAliveInterval: keepAlive,
    cleanSession: cleanSession,
    useSSL: ssl,
    // userName: userName,
    // password: password,
    onSuccess: onConnect,
    onFailure: function (e) {
        console.log(e);
        alert('连接服务器失败:'+e);
    }
};
client.connect(options);
function subscribe(newTopic,oldTopic) {
    oldTopic.forEach(t=>{
        if(!(t==="")){
            client.unsubscribe(t);
            console.log('取消订阅 '+t);
        }
    });
    newTopic.forEach(t=>{
        if(!(t==="")){
            client.subscribe(t);
            console.log('成功订阅 '+t);
        }
    });
}
//连接服务器并注册连接成功处理事件
function onConnect() {
    console.log("onConnected");
    isConnect=true;
}

client.onConnectionLost = onConnectionLost;

//注册连接断开处理事件
client.onMessageArrived = onMessageArrived;

//注册消息接收处理事件
function onConnectionLost(responseObject) {
    console.log(responseObject);
    if (responseObject.errorCode !== 0) {
        console.log("onConnectionLost:" + responseObject.errorMessage);
        console.log("连接已断开");
    }
    alert('连接服务器失败:'+responseObject);
}

function onMessageArrived(message) {
    console.log("收到消息:" + message.payloadString);
    isConnect=true;
    data.messages.push({'isSubscribe':true,'payload':message.payloadString});
}

function send(topic,s) {
        message = new Paho.MQTT.Message(topic+':'+s);
        message.destinationName = topic;
        client.send(message);
        console.log(s);
        data.messages.push({'isSubscribe':false,'payload':topic+':'+s});
}
setTimeout(function () {
    data.fuck='zhangming';

},2000);
