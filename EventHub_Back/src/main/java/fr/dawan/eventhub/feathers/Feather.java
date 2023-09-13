package fr.dawan.eventhub.feathers;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Random;

import javax.imageio.ImageIO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;

import fr.dawan.eventhub.Enum.Role;
import fr.dawan.eventhub.Enum.TypeEvent;
import net.datafaker.Faker;

public class Feather {

	private PasswordEncoder passwordEncoder;
	private Faker faker;

	private List<String> filenames=new ArrayList<>();
	
	
	private List<String> cities=Arrays.asList(
			"Lyon","Saint-Étienne","Grenoble","Villeurbanne","Clermont-Ferrand","Annecy",
			"Vénissieux","Valence","Chambéry","Vaulx-en-Velin","Saint-Priest",
			"Caluire-et-Cuire",  "Bron",  "Bourg-en-Bresse",  "Montélimar",  "Saint-Martin-d'Hères",
			"Échirolles",  "Annemasse",  "Villefranche-sur-Saône",  "Thonon-les-Bains",  "Saint-Chamond",
			"Meyzieu",  "Montluçon",  "Roanne",  "Romans-sur-Isère",  "Rillieux-la-Pape",
			"Aix-les-Bains",  "Vienne",  "Décines-Charpieu",  "Bourgoin-Jallieu"
		);
	
	private List<String> title=Arrays.asList(
			"Des adolescents n'ont pas vraiment faim pour se moucher...",
		    "Des bouseux maugréent pour sangloter.",
		    "Est-ce qu'un blessé de guerre itinérant passait pour se détendre ?",
		    "La personne dont tu m'as parlé sifflote pour comploter.",
		    "Je traîne pour hululer.",
		    "Les pires escrocs nageaient pour s'auto-mutiler.",
		    "Vous languissez pour étouffer !",
		    "Tu grossissais pour abandonner.",
		    "Un certain \"Jean-Luc Delarue\" bourlingue pour batifoler.",
		    "Les officiers supérieurs botswanaiss reculeront pour empester.",
		    "Vous progressiez pour nager.",
		    "Elles macèrent pour se goinfrer.",
		    "Est-ce que des nains effrontés se coiffent pour rebondir ?",
		    "Trois donneuses d'organes s'installent pour prendre racine...",
		    "Une poissonnière ne se débrouille pas encore pour ne plus agir.",
		    "Nous nous brossions les dents pour nous calmer.",
		    "Nous ne cuisinions plus pour chômer.",
		    "Où Bob Marley et sa famille manœuvrent-ils pour postillonner ?",
		    "L'imbécile sifflotera pour hurler.",
		    "Quelqu'un qui déteste Mussolini avancera pour avoir soif.",
		    "Je bave pour siffloter !",
		    "Des collectionneurs glisseront pour pivoter.",
		    "Un groupe de compères digère pour sursauter...",
		    "Une vacancière couine pour coopérer.",
		    "Des voleurs suinteront pour s'étioler...",
		    "Un groupe de participantes régresse pour chuchoter !",
		    "Nous abdiquons pour glisser.",
		    "Assez de gouverneurs militent pour ralentir.",
		    "Une milicienne agressive verdira pour bégayer.",
		    "Tu conspirais pour festoyer.",
		    "Tenez-vous bon pour avoir sommeil ?",
		    "Vous vous désaltériez pour ne guère récidiver !",
		    "Des mentalistes murmurent pour traîner.",
		    "Nous persévérons pour ne pas nous morfondre.",
		    "Le margoulin proliférait pour stagner.",
		    "L'évèque renonce-t-il pour soupirer ?",
		    "Des sociopathes pyromanes se calment pour zigzaguer.",
		    "Nous nous étiolerons pour moisir.",
		    "Des milliers de puéricultrices mugissent pour se calmer.",
		    "Simone Signoret se suicide pour gargouiller.",
		    "Une journaliste polémiquera pour ne pas perdre espoir.",
		    "Les tricheuses dormiront pour errer.",
		    "Nous déclinions pour voyager.",
		    "Des horlogères font le poids pour recommencer.",
		    "Cet écrivain triomphait pour fulminer.",
		    "Le premier amour de Françoise Dolto se mouche pour dormir.",
		    "Vous jubilez pour sangloter.",
		    "Trois entreprises oscillent pour ne plus jamais se laver.",
		    "L'adjoint au maire n'a pas faim pour échouer.",
		    "La maîtresse morte-vivante réfléchit pour déjeuner.",
		    "Des exploratrices plaident coupable pour trépigner.",
		    "Le beau-frère de Florent Pagny sautille pour vivre.",
		    "Le Honduras crache pour ne pas vraiment mincir.",
		    "Ces philatélistes abdiquent-ils pour ne presque jamais reculer ?",
		    "Comment des jongleuses dérivaient-elles pour recommencer ?",
		    "Les hauts gradés brûlaient pour macérer !",
		    "Je trépigne pour enfler.",
		    "Est-ce qu'elle exulte pour se baigner ?",
		    "Florent Pagny souffle pour revenir.",
		    "Les justiciers bondissent-ils pour sangloter ?",
		    "Un nombre incalculable de talibans geint pour batifoler.",
		    "La coiffeuse turque déconne pour porter le deuil.",
		    "Thomas Sankara tremblera pour ne plus divaguer !",
		    "Quand ne bosse-t-il pas pour se tortiller ?",
		    "Une entité murmurera pour échouer !",
		    "Un particulier rachitique paradera pour glander !",
		    "Chôme-t-il pour parler ?",
		    "Tu casseras la croûte pour parlementer.",
		    "Les monitrices de parapente se lèvent pour resplendir.",
		    "Il s'ennuie pour blasphémer.",
		    "Vous batifolez pour décliner.",
		    "Est-ce que presque tous les moines pivotent pour se prosterner ?",
		    "Est-ce que huit flibustiers douteront pour gigoter ?",
		    "Le pantin hurle pour ne pas agoniser.",
		    "Un journaliste sur cent tournait pour s'énerver.",
		    "Le juge d'instruction ricane pour garder courage.",
		    "Les bandits se méfiaient pour suffoquer.",
		    "Un professeur d'éducation physique plaidera coupable pour chanter.",
		    "Un démon atterrissait pour râler !",
		    "Les meilleurs experts polémiquaient pour se coucher.",
		    "Un manchot gémit pour décliner.",
		    "Des âmes filaient pour s'allonger.",
		    "Une secrétaire n'abandonne pas pour triompher.",
		    "La caissière soupirera pour bronzer.",
		    "Le chat de Joey Starr temporise pour chigner.",
		    "Des nourrices flâneront-elles pour s'étioler ?",
		    "Des joueuses de ping-pong insistent pour riposter.",
		    "Cet entrepreneur ne vibrait pas pour siffloter.",
		    "Un agent immobilier s'inscrit pour fondre.",
		    "Un nombre incalculable d'espions bivouaquera pour donner l'alerte.",
		    "Les agents doubles à l'agonie salivent pour rendre l'âme.",
		    "Tu hennis pour jubiler.",
		    "Les joueurs divorcent pour gargouiller.",
		    "Est-ce que ce procureur parlemente pour briller ?",
		    "Un antimilitariste s'auto-mutile pour imploser.",
		    "Où un juge se calme-t-il pour grossir ?",
		    "Un paquet de végétariennes à pied tintinnabulent pour picoler.",
		    "Des goujats se désaltèrent pour grossir.",
		    "Vous ne vous plantiez pas encore pour macérer.",
		    "Cet abruti alunissait pour ne presque plus accoucher.",
		    "Je me réveillerai pour bavarder.",
		    "Comment filerons-nous pour gonfler ?",
		    "Elles progressent pour grandir.",
		    "Je digérais pour coopérer.",
		    "Est-ce qu'ils régressaient pour s'auto-mutiler ?",
		    "La députée bête à manger du foin saignait pour beugler.",
		    "Tu lévites pour gargouiller...",
		    "Est-ce que les marquis diminuaient pour frimer ?",
		    "Les gnomes écervelés henniront pour roupiller.",
		    "Les gens insistent pour réfléchir.",
		    "Où prions-nous pour parader ?",
		    "Je blasphémerai pour cogiter.",
		    "Le grossiste voyage-t-il pour marcher ?",
		    "Le facteur se brosse les dents pour divaguer.",
		    "Un cavalier festoiera pour rajeunir.",
		    "Le professeur Rollin et toute sa clique tricotent-ils pour mener ?",
		    "Yvette Horner proteste pour céder.",
		    "Deux monstres fanfaronnent-ils pour exulter ?",
		    "La sociopathe se mouchera pour bronzer.",
		    "Ces joueuses sursautent pour délirer !",
		    "Vous dormez pour dormir.",
		    "Florent Pagny bouquine pour ne pas du tout jouer.",
		    "La France pinaille pour se reposer !",
		    "Toute l'équipe bricole pour ne pas bronzer.",
		    "La percussionniste prendra feu pour fleurir !prononcer !supprimer ?");
		
	public Feather(PasswordEncoder passwordEncoder) {
		super();
		this.passwordEncoder=passwordEncoder;
		this.faker=new Faker();
	}

	public Faker getFaker() {
		return faker;
	}

	public void setFaker(Faker faker) {
		this.faker = faker;
	}

	public String addFakerTitre() {
		return title.get(new Random().nextInt(title.size()));
	}
	
	public String addFakerLorem(int nbCaractere) {
		return this.faker.lorem().characters(nbCaractere);
	}
	
	
	public LocalDateTime addFakerDateTime(String dateStart, String dateEnd) {
		Instant date_Start=LocalDateTime.parse(dateStart).atZone(ZoneId.systemDefault()).toInstant();
		Instant date_End=LocalDateTime.parse(dateEnd).atZone(ZoneId.systemDefault()).toInstant();
		 Date date = this.faker.date().between(Date.from(date_Start), Date.from(date_End));
		 return date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
	}
	
	public String addFakerLieu() {
		return cities.get(new Random().nextInt(cities.size()));
	}
	
	public Double addFakerPrix() {
		return this.faker.number().randomDouble(2, 0, 100);
	}
	
	public String addFakerPseudo() {
		return this.faker.pokemon().name();
	}
	
	public String addFakerFirstname() {
		return this.faker.name().firstName();
	}
	
	public String addFakerLastname() {
		return this.faker.name().lastName();
	}
	
	public String addFakerPassword() {
	    System.out.println(passwordEncoder.encode(this.faker.lorem().characters(8)));
	    return passwordEncoder.encode(this.faker.lorem().characters(8));
	}
	
	public String addFeatherEmail() {
		return addFakerFirstname()+"."+addFakerLastname()+"@gmail.com";
	}

	public Role addRole() {
		List<Role> roles=Arrays.asList(Role.USER, Role.ADMIN);
		return roles.get(new Random().nextInt(roles.size()));
	}
	
	public byte[] converterFileImgToByteArray(String pathFolder, String filename) throws IOException {
		System.out.println(pathFolder+filename);
		BufferedImage bImage = ImageIO.read(new File(pathFolder+filename));
		ByteArrayOutputStream bos=new ByteArrayOutputStream();
		ImageIO.write(bImage, "jpg", bos);
		return bos.toByteArray();
	}
	
//	Attention : nextInt génère une valeur 0 si un seul attribut ce qui cause un eventKey 0 et donc un imgs null et donc une erreur. 
	public Object[] eventAndImgRandom(Map<TypeEvent, List<String>> mapEventImg) {
		Object[] keys=mapEventImg.keySet().toArray();
		int key = new Random().nextInt(keys.length);
		Object eventKey=TypeEvent.values()[(int) key];
		List<String> imgs=mapEventImg.get(eventKey);
		String img=mapEventImg.get(TypeEvent.values()[(int) key]).get(new Random().nextInt(imgs.size()));
		Object[] tab= {eventKey, img};
		return tab;
	}
	
	public List<String> recoveryFileNameImage(String folder){
		File file = new File(folder);
		File[] imgs = file.listFiles();
		for(File f : imgs) {
			filenames.add(f.getName());
		}
		return filenames;
	}
}
