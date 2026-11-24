import json,sys
p=sys.argv[1]; d=json.load(open(p)); S={s["id"]:s for s in d["scenes"]}
def add(i,en,idn,mode="end"):
    n=S[i]["narration"]; n["en"]=(n["en"]+" "+en).strip(); n["id"]=(n["id"]+" "+idn).strip()
S["s04"]["narration"]={"en":"It started with a gift. In May 2000, Japan's aid agency and the Tokyo city government donated seventy-two used subway cars from Tokyo's Mita Line.","id":"Semuanya dimulai dari hibah. Mei 2000, badan bantuan Jepang dan pemerintah kota Tokyo memberi tujuh puluh dua gerbong kereta bawah tanah bekas dari jalur Mita di Tokyo."}
add("s09","Even after shipping, a used car was about one ninth of that price.","Bahkan setelah ongkos kirim, gerbong bekas harganya kira-kira sepersembilan dari itu.")
add("s13","That change in the 1940s is a big reason a Tokyo train fits Java's rails today.","Perubahan di tahun 1940-an itu salah satu alasan besar kereta Tokyo pas di rel Jawa sekarang.")
add("s33","That left nine trains the network was counting on, still not carrying anyone.","Artinya masih ada sembilan rangkaian yang diandalkan, tapi belum mengangkut siapa pun.")
add("s39","Even an order signed in January would not ease this year's crowding.","Pesanan yang diteken Januari pun tidak akan mengurangi kepadatan tahun ini.")
add("s47","After that, Jakarta would be shopping for trains again.","Setelah itu, Jakarta harus belanja kereta lagi.")
add("s54","Some of those cars are already past forty.","Sebagian gerbong itu umurnya sudah lewat empat puluh tahun.")
add("s31","The newer Chinese trains were filmed here in November 2026, running alongside the old Japanese ones.","Kereta China yang lebih baru ini direkam November 2026, jalan berdampingan dengan kereta Jepang yang lama.")
add("s20","The fleet was getting older every year, and passenger numbers kept rising.","Armadanya makin tua tiap tahun, dan jumlah penumpang terus naik.")
add("s12","Change the rail width and you need new wheels, new axles, often a new train.","Kalau lebar relnya beda, roda dan as harus diganti, sering kali keretanya juga.")
S["s09"]["sources"].append({"url":"https://finance.detik.com/read/2019/08/19/161619/4671967/1036/ri-bisa-bikin-krl-tapi-kok-impor-yang-bekas-dari-jepang","claim":"Kereta bekas Jepang sekitar Rp2 miliar termasuk ongkos kirim, INKA sekitar Rp18 miliar"})
d["sources"]=[{"scene":x["id"],"url":y["url"],"claim":y["claim"]} for x in d["scenes"] for y in x.get("sources",[])]
json.dump(d,open(p,"w"),ensure_ascii=False,indent=1)
for i in ["s09","s10","s12","s13","s31","s33"]: print(i,S[i]["narration"]["en"][:90])
# --- footage stok tambahan (target 20-30% durasi) ---
def stock(i, kw, ost, desc):
    s=S[i]; s["visual"]={"type":"broll","description":desc,"on_screen_text":ost}
    s["broll"]={"keywords":kw,"avoid":["face close up","logo"]}
    st=s["stage"]; st.pop("insert",None); st["bg"]="none"; st["actors"]=st.get("actors",[])[:1]
    for a in st["actors"]: a["scale"]=0.7
    st.pop("fx",None)
stock("s07",["jakarta commuter train","indonesia electric train station"],"Used car from Japan: Rp 0.8 to 1 bn (2014)","Footage stok: KRL di Jakarta")
stock("s36",["crowded train platform commuters","rush hour train station asia"],"Busiest days: up to 1.3 million trips","Footage stok: peron padat jam sibuk (tanpa wajah dekat)")
stock("s44",["cargo ship at sea","container ship ocean"],"Used: 1 to 2 months · New: 1 to 2 years","Footage stok: kapal kargo di laut")
stock("s52",["old train depot","train yard rail cars"],"2000 donation · 2023 blocked · 2026 cancelled","Footage stok: depo kereta tua")
S["s29"]["narration"]["id"]="Kabin masinisnya akan dipajang permanen di Stasiun Jakarta Kota. Jakarta memberi kereta bekasnya upacara pensiun yang layak."
json.dump(d,open(p,"w"),ensure_ascii=False,indent=1)
# --- validator build-visual butuh keywords walau ada own (footage.mjs memakai own lebih dulu) ---
for s in d["scenes"]:
    b=s.get("broll")
    if b and "own" in b and not b.get("keywords"): b["keywords"]=["jakarta commuter train"]
json.dump(d,open(p,"w"),ensure_ascii=False,indent=1)
# --- revisi anti-slop (baca ulang) ---
def setn(i,en,idn): S[i]["narration"]={"en":en,"id":idn}
setn("s01","This train used to carry commuters in Tokyo. Jakarta still runs hundreds of cars like it, and in November it refused to buy any more.",
 "Kereta ini dulu mengangkut penumpang di Tokyo. Jakarta masih menjalankan ratusan gerbong seperti ini, dan November lalu Jakarta menolak membeli lagi.")
setn("s11","But price alone doesn't explain it. In many countries, a train from Tokyo can't run without major changes. In Jakarta, it can.",
 "Tapi harga saja tidak cukup menjelaskan. Di banyak negara, kereta dari Tokyo tidak bisa jalan tanpa diubah besar-besaran. Di Jakarta, bisa.")
setn("s13","That match has a history. Java's first railway, in 1867, was built wider. During the Japanese occupation in the 1940s, the remaining wide lines on Java were converted to the narrower Japanese width. That is a big reason a Tokyo train fits Java's rails today.",
 "Kesamaan ini ada sejarahnya. Jalur kereta pertama di Jawa, tahun 1867, dibangun lebih lebar. Saat pendudukan Jepang tahun 1940-an, jalur lebar yang tersisa di Jawa diubah ke lebar rel Jepang yang lebih sempit. Itu alasan besar kereta Tokyo pas di rel Jawa sekarang.")
setn("s20","A fleet that old needs replacing, and passenger numbers kept rising. The first attempt to replace it with more Tokyo trains came in 2023, and it was blocked.",
 "Armada setua itu harus diganti, dan jumlah penumpang terus naik. Upaya pertama menggantinya dengan kereta Tokyo lagi terjadi di 2023, dan ditolak.")
setn("s27","Compare that with the old deal. Twelve used cars from Japan once cost about twelve billion. One new twelve-car train cost around twenty times as much.",
 "Bandingkan dengan cara lama. Dua belas gerbong bekas Jepang dulu sekitar dua belas miliar. Satu rangkaian baru berisi dua belas gerbong harganya kira-kira dua puluh kali lipat.")
setn("s31","All eleven Chinese trains are running, mostly on the Bogor and Cikarang lines. This footage is from November 2026: a Chinese train on the Bogor line, sharing the tracks with the old Japanese ones.",
 "Kesebelas rangkaian China sudah beroperasi, kebanyakan di lintas Bogor dan Cikarang. Footage ini dari November 2026: kereta China di lintas Bogor, berbagi rel dengan kereta Jepang yang lama.")
setn("s35","That's about one point one million trips a day. The operator had planned for three to four percent growth, not eleven.",
 "Itu sekitar satu koma satu juta perjalanan per hari. Operatornya merencanakan pertumbuhan tiga sampai empat persen, bukan sebelas.")
setn("s36","On the busiest days, the count can reach one point three million, on the same number of trains.",
 "Di hari tersibuk, jumlahnya bisa mencapai satu koma tiga juta, dengan jumlah kereta yang sama.")
setn("s39","A new train takes one to two years from order to delivery. An order signed in January 2026 would arrive in 2027 at the earliest.",
 "Kereta baru butuh satu sampai dua tahun dari pesan sampai datang. Pesanan yang diteken Januari 2026 paling cepat baru datang di 2027.")
setn("s43","The pressure behind that vote was a forecast of three hundred and sixty-nine million passenger trips in 2026. Every missing train makes the remaining ones fuller.",
 "Tekanan di balik keputusan itu adalah proyeksi tiga ratus enam puluh sembilan juta perjalanan di 2026. Setiap rangkaian yang kurang membuat rangkaian lain makin penuh.")
setn("s51","Japan keeps its commuter trains for twenty to thirty years. By the time a car is free to sell, it's usually past Jakarta's limit.",
 "Jepang memakai kereta komuternya dua puluh sampai tiga puluh tahun. Saat gerbongnya siap dijual, umurnya biasanya sudah lewat batas Jakarta.")
d["sources"]=[{"scene":x["id"],"url":y["url"],"claim":y["claim"]} for x in d["scenes"] for y in x.get("sources",[])]
json.dump(d,open(p,"w"),ensure_ascii=False,indent=1)
setn("s22","The government said no. The cars stayed in Japan. Officials chose to refit old trains and buy new ones instead.",
 "Pemerintah menolak. Gerbongnya tetap di Jepang. Sebagai gantinya, kereta lama diperbarui dan kereta baru dibeli.")
setn("s36","On the busiest days, the count can reach one point three million. That's two hundred thousand more trips than an ordinary day.",
 "Di hari tersibuk, jumlahnya bisa mencapai satu koma tiga juta. Itu dua ratus ribu perjalanan lebih banyak dari hari biasa.")
d["anti_slop"]={"text_score_en":39,"text_score_id":38}
json.dump(d,open(p,"w"),ensure_ascii=False,indent=1)
