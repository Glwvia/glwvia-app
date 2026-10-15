import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, Alert } from 'react-native';

export default function App() {
  const [posts, setPosts] = useState([{id:'1', text:'Welcome to Glwvia! 🔥', likes:12}]);
  const [input, setInput] = useState('');
  const [tab, setTab] = useState('feed');

  const AGORA_APP_ID = 'f4fdab6664884789b52efc10b8bc63a9';
  const ADMOB_ID = 'ca-app-pub-3849764691';

  const addPost = () => {
    if(!input) return;
    setPosts([{id:Date.now().toString(), text:input, likes:0}, ...posts]);
    setInput('');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>Glwvia</Text>
        <Text style={styles.sub}>Chat • Call • Live • Feed</Text>
      </View>

      <View style={styles.tabs}>
        {['feed','chat','live','ads'].map(t=>(
          <TouchableOpacity key={t} onPress={()=>setTab(t)} style={[styles.tab, tab===t && styles.tabActive]}>
            <Text style={styles.tabText}>{t.toUpperCase()}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {tab==='feed' && (
        <View style={{flex:1, padding:10}}>
          <View style={styles.postBox}>
            <TextInput style={styles.input} placeholder="What is happening?" value={input} onChangeText={setInput} />
            <TouchableOpacity style={styles.postBtn} onPress={addPost}><Text style={{color:'#fff'}}>Post</Text></TouchableOpacity>
          </View>
          <FlatList data={posts} keyExtractor={i=>i.id} renderItem={({item})=>(
            <View style={styles.card}><Text>{item.text}</Text><Text style={styles.like}>❤️ {item.likes} likes</Text></View>
          )} />
        </View>
      )}

      {tab==='chat' && <View style={styles.center}><Text>💬 Real-time Chat (Firebase: glwvia)</Text><TouchableOpacity style={styles.bigBtn} onPress={()=>Alert.alert('Chat Ready','Firebase connected!')}><Text style={{color:'#fff'}}>Start Chat</Text></TouchableOpacity></View>}
      {tab==='live' && <View style={styles.center}><Text>🔴 Go Live Ready</Text><Text>Agora ID: {AGORA_APP_ID}</Text><TouchableOpacity style={styles.bigBtn} onPress={()=>Alert.alert('Live','Agora Live Ready - 10k mins free!')}><Text style={{color:'#fff'}}>Go Live</Text></TouchableOpacity></View>}
      {tab==='ads' && <View style={styles.center}><Text>💰 Monetization Active</Text><Text>AdMob: {ADMOB_ID}</Text><Text>Paystack Subscription Ready</Text></View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1, backgroundColor:'#fff', paddingTop:40},
  header:{padding:15, backgroundColor:'#E1306C', alignItems:'center'},
  logo:{color:'#fff', fontSize:28, fontWeight:'bold'},
  sub:{color:'#fff'},
  tabs:{flexDirection:'row', justifyContent:'space-around', padding:10, backgroundColor:'#f5f5f5'},
  tab:{padding:8, borderRadius:10, backgroundColor:'#ddd'},
  tabActive:{backgroundColor:'#E1306C'},
  tabText:{fontSize:12, fontWeight:'bold'},
  postBox:{flexDirection:'row', marginBottom:10},
  input:{flex:1, borderWidth:1, borderColor:'#ddd', borderRadius:20, padding:10},
  postBtn:{backgroundColor:'#E1306C', padding:12, borderRadius:20, marginLeft:5},
  card:{padding:15, borderWidth:1, borderColor:'#eee', borderRadius:10, marginBottom:10},
  like:{marginTop:5, color:'#E1306C'},
  center:{flex:1, alignItems:'center', justifyContent:'center', padding:20},
  bigBtn:{backgroundColor:'#000', padding:15, borderRadius:10, marginTop:20}
});
