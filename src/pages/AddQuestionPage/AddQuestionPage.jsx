import { useActionState } from "react";
import { Button } from "../../components/Button/Button.jsx";
import { Loader } from "../../components/Loader/Loader.jsx";
import { delayFn } from "../../helpers/delayFn.js";
import { toast } from "react-toastify";
import { API_URL } from "../../constants/index.js";
import style from "./AddQuestionPage.module.css";

const createCardAction = async (_prevState, formData) => {
  try {
    await delayFn();

    const newQuestion = Object.fromEntries(formData);
    const resources = newQuestion.resources.trim();
    const isClearForm = newQuestion.clearForm; // formData.get("question")

    const response = await fetch(`${API_URL}/react`, {
      method: "POST",
      body: JSON.stringify({
        question: newQuestion.question,
        answer: newQuestion.answer,
        description: newQuestion.description,
        resources: resources.length ? resources.split(",") : [],
        level: Number(newQuestion.level),
        completed: false,
        editDate: undefined,
      }),
    });

    if (response.status === 404) {
      throw new Error(response.statusText);
    }
    const question = response.json();
    toast.success("New question is successfuly created");

    return isClearForm ? {} : question;
  } catch (error) {
    toast.error(error.message);
    return {};
  }
};

const AddQuestionPage = () => {
  const [formState, formAction, isPending] = useActionState(createCardAction, {
    clearForm: false,
  });

  return (
    <>
      {isPending && <Loader />}
      <h1 className={style.formTitle}>Add new question</h1>
      <div className={style.formContainer}>
        <form action={formAction} className={style.form}>
          <div className={style.formControl}>
            <label htmlFor="questionField">Question: </label>
            <textarea
              defaultValue={formState.question}
              name="question"
              id="questionField"
              cols="30"
              rows="2"
              required
              placeholder="PLease enter a question"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="answerField">Short Answer: </label>
            <textarea
              defaultValue={formState.answer}
              name="answer"
              id="answerField"
              cols="30"
              rows="2"
              required
              placeholder="PLease enter a short answer"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="descriptionField">Description: </label>
            <textarea
              defaultValue={formState.description}
              name="description"
              id="descriptionField"
              cols="30"
              rows="5"
              required
              placeholder="PLease enter a full description"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="resourcesField">Resources: </label>
            <textarea
              defaultValue={formState.resources}
              name="resources"
              id="resourcesField"
              cols="30"
              rows="5"
              placeholder="PLease enter resources separated by commas"
            ></textarea>
          </div>
          <div className={style.formControl}>
            <label htmlFor="levelField">Level: </label>
            <select name="level" id="levelField" defaultValue={formState.level}>
              <option disabled>Question level</option>
              <hr />
              <option value="1">1 - easiest</option>
              <option value="2">2 - medium</option>
              <option value="3">3 - hardest</option>
            </select>
          </div>

          <label htmlFor="clearFormField" className={style.clearFormControl}>
            <input
              className={style.checkbox}
              type="checkbox"
              name="clearForm"
              id="clearFormField"
              defaultChecked={formState.clearForm}
            />
            <span>clear form after submitting ?</span>
          </label>

          <Button isDisabled={isPending}>Add question</Button>
        </form>
      </div>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt sapiente
        commodi esse aspernatur voluptates vitae, accusantium autem. Delectus,
        deserunt. Nobis accusantium nesciunt quos reiciendis dolor quae tempore
        omnis perferendis tenetur aliquid exercitationem, facilis odit sint
        ipsum molestias deserunt aliquam sapiente voluptates vitae. Ad provident
        harum ab asperiores aliquam eius quae sapiente architecto iure aperiam!
        Magni, amet placeat culpa et nesciunt rem iusto quasi asperiores omnis
        vel harum, totam nulla reprehenderit, dolorem quidem eaque quaerat
        consequuntur obcaecati. Quaerat rem accusantium inventore ab doloremque
        vel molestiae aliquam, iste accusamus, recusandae distinctio ex aut
        voluptatem ad optio adipisci facilis? Minus beatae, quaerat nostrum cum
        eveniet quam dolor sed totam ea aut magni repudiandae optio cumque
        explicabo porro? Ad laborum officiis dolorum doloremque, alias officia
        similique sunt labore quis nulla mollitia sit neque nostrum perferendis
        dolores. Explicabo maiores ab debitis quos id, aspernatur ipsam,
        voluptatibus voluptates harum voluptatum, ullam doloribus. Nostrum
        magnam ex autem dolores cumque iusto voluptatibus ratione atque ipsam
        deserunt nulla, qui quidem id rem ab impedit perspiciatis, sapiente aut
        possimus dolor cum eveniet architecto nesciunt voluptas. Nemo tempora
        minima quaerat perferendis similique reiciendis autem aut amet quos,
        odio vitae dignissimos repellat cum porro earum molestias nihil nesciunt
        quae distinctio alias modi doloribus. Hic cum maiores culpa alias
        debitis dolorum, soluta accusantium nostrum beatae, dolore sint dolores,
        enim ab ducimus non eaque! Optio obcaecati, molestiae sunt odit quod
        reprehenderit dicta nihil. Ipsa quasi iure ab eaque, quaerat
        consequuntur eos ex sapiente reiciendis, laborum debitis? Alias saepe
        quia dicta distinctio nulla officiis ipsam nam consequuntur nihil amet
        mollitia, ipsum, dolor ratione adipisci voluptatum unde reiciendis
        delectus nisi voluptate fugit optio! Sequi cum esse minus consequatur,
        nemo autem laudantium tempora ducimus optio unde? Voluptatem aperiam
        harum quisquam expedita provident laborum rem sequi, tempore vitae quasi
        repudiandae culpa, sed molestias recusandae a corporis reiciendis
        deleniti odio? Tempore perferendis modi expedita quod illum ipsa
        corporis ad odio amet explicabo quidem provident quasi nobis corrupti,
        repudiandae magni vel dignissimos, reiciendis placeat nihil suscipit
        similique. Rerum saepe adipisci, molestiae vero ratione distinctio velit
        laboriosam quisquam omnis facilis! Atque aut quos molestiae quis vitae
        voluptas sequi quisquam explicabo nobis, a accusamus dolorum
        voluptatibus quia aliquid illum. Mollitia architecto vel ullam aliquam
        quae cupiditate beatae praesentium quod earum nesciunt veniam
        repudiandae doloribus, ab quasi cum quis minima dolor, dignissimos
        aliquid, perferendis nobis repellendus repellat! Consequuntur culpa, hic
        distinctio reiciendis, necessitatibus atque repellat expedita iste
        dolorum, veniam doloribus? A accusantium laudantium mollitia similique
        tempora sapiente maiores, ut doloremque placeat id neque sint
        consequuntur nobis illum error sed dicta. Incidunt rem culpa
        repellendus. Suscipit, porro voluptates fuga vero doloribus voluptatum!
        Veritatis sit dolore perferendis vel alias optio, distinctio sequi
        magnam nostrum laudantium tempore earum perspiciatis quisquam id. Quod
        dolore ipsum, adipisci quas molestias veritatis. Veniam eveniet at
        dolore natus amet facere, similique fuga dicta, et illo cupiditate
        voluptates. Cum libero nam maxime. Porro voluptatibus eligendi numquam
        nisi soluta? Aut, eius fugit iure dolorem in, modi sapiente ratione vel
        quisquam commodi fuga pariatur quia voluptatum, sunt praesentium
        reiciendis molestias odit autem nobis ullam placeat velit sit? Et
        reiciendis itaque accusamus quisquam? Possimus voluptatem, placeat
        laudantium eveniet suscipit non ducimus pariatur obcaecati numquam
        debitis cumque quibusdam magni eligendi! Consequatur corporis, ex
        corrupti nulla est rerum sint voluptate laboriosam repudiandae quaerat
        aperiam tenetur eius ab quibusdam iste? Perspiciatis quos assumenda iure
        in excepturi aut laboriosam provident. Animi corporis laboriosam
        laborum, maiores quo numquam officia hic iure harum possimus explicabo
        voluptatibus excepturi quasi consectetur quaerat quis qui, officiis ea
        facere magnam eligendi pariatur molestiae consequatur dolore. Fugit iure
        distinctio debitis, itaque, blanditiis accusamus consequuntur non sint
        eos ex, repellat consequatur eveniet? Quae reiciendis mollitia
        voluptatem amet corporis facilis dolore at. Ducimus, quis earum pariatur
        in quidem aliquam velit commodi dolor ea fuga, reprehenderit tempore
        optio nulla asperiores, quod perferendis enim possimus dolore voluptatum
        quia modi eius itaque error aut. Harum nisi nobis molestiae nulla
        aperiam exercitationem debitis ullam suscipit, accusamus ducimus saepe
        cum nesciunt consequuntur ipsum, eaque voluptatibus incidunt odio
        nostrum ut, ad pariatur quae porro fugit. Error voluptas, doloremque
        quaerat minima aut commodi et, eveniet vero provident illum dignissimos
        maxime sunt explicabo aperiam quae inventore eligendi possimus quo
        cumque libero quidem? Maiores laboriosam totam nesciunt corrupti
        architecto aliquid eos incidunt velit, provident quasi sunt, voluptate
        id assumenda vero quaerat ab dolore? Excepturi earum eos esse quia
        laboriosam facere dignissimos fugiat commodi veritatis temporibus
        consequuntur, asperiores iste at. Quas perspiciatis cum quis, asperiores
        iure reiciendis. Dolores minima molestias optio molestiae consequatur
        aliquid dignissimos ex at ipsa! Et, exercitationem itaque error enim
        aspernatur dignissimos rerum, recusandae inventore architecto
        repellendus eius in perferendis nobis accusantium eligendi dolor natus
        adipisci, iure praesentium autem animi atque nemo? Error consectetur
        cupiditate pariatur, obcaecati sit iusto atque itaque necessitatibus.
        Quis nostrum sed maiores iusto quisquam cum vero fugiat dolor neque sint
        dolorem nobis facilis impedit in, dolores provident? Et optio iusto
        aspernatur pariatur temporibus, ab molestiae similique maiores
        consectetur quod suscipit earum nihil id accusamus, minima eligendi
        animi quo, officia laudantium minus maxime. Explicabo totam asperiores
        soluta culpa odio ab dolorem suscipit maiores sint libero, dolore earum
        in quam doloribus! Reiciendis ut, doloribus, totam ratione quidem quos
        illo est iste ullam deserunt aspernatur minima odit cumque perspiciatis
        nisi distinctio necessitatibus dolorem, harum amet inventore dolor
        velit. Quod, minima iure doloremque nemo voluptate nihil nobis facilis
        cupiditate quis nostrum dolore, quasi omnis! Doloribus sunt, harum ad
        architecto iure tempora ea ullam id ex, repellat sapiente quis eos amet
        ipsa quasi vitae accusantium provident, ipsum nobis quo voluptates?
        Animi nihil dolores sed doloremque vero dolorum! Tempore eos eum error
        eveniet consequatur aliquam. Aperiam blanditiis fuga dicta explicabo
        ipsum quam obcaecati ea accusamus porro, iste nam qui culpa cupiditate
        mollitia maxime magnam quo animi, voluptatum non enim nemo doloremque
        modi ab. In quam, voluptatibus magni, quis adipisci ad nemo, voluptas
        reiciendis odio facere excepturi ratione omnis temporibus non. Quo quas
        ab quibusdam totam quos delectus deserunt facilis. Quidem veritatis unde
        quaerat quas perferendis? Iusto nulla laborum, impedit eveniet omnis
        provident eum odio in exercitationem quos beatae, a illum quae minus rem
        aperiam. Delectus temporibus praesentium asperiores repellat neque dolor
        ducimus corporis. Sit rerum officiis ad esse quidem incidunt, architecto
        facilis natus commodi minus, cum tenetur doloribus temporibus quam
        asperiores nesciunt tempore quos voluptatem dolore in eos eligendi
        inventore omnis! Sit maxime suscipit, at cumque velit vero fugiat est?
        Harum eius minima explicabo at libero assumenda ex quod veritatis minus,
        voluptatem nisi. Sint nostrum maxime aperiam nulla beatae quae, vel
        necessitatibus optio, consequatur quasi enim eligendi placeat quas
        consequuntur quibusdam animi? Aperiam deserunt molestias molestiae eius
        amet minima repudiandae. Tenetur quos odio a corporis, magnam doloremque
        recusandae voluptate dicta architecto reprehenderit nemo. Aperiam neque
        ratione similique distinctio vero, hic aliquid dicta optio repudiandae
        veniam non eum suscipit aut a soluta corporis ut exercitationem amet
        dolore deserunt quos sapiente? Repudiandae nisi, ipsam esse non suscipit
        natus dicta aut itaque, eius quidem perspiciatis illum nemo quisquam
        optio doloribus accusantium vel earum nihil atque. Perferendis
        necessitatibus expedita ipsum aliquam quos, et unde id voluptate
        deserunt dolore quibusdam est quisquam impedit ut ad, accusamus
        inventore maxime quo quas. Obcaecati ipsum atque quam hic corporis sint
        tenetur numquam. Vero numquam quisquam doloremque alias repellat
        perspiciatis, dolore qui animi similique fugiat id veniam laborum
        praesentium provident suscipit culpa ratione dolorem minus dicta
        laudantium ex dolores vitae possimus tempore. Minima accusamus aliquid
        sequi voluptatibus rerum facilis, harum labore natus quibusdam molestiae
        soluta aperiam dolores aliquam, nobis quod? Placeat earum cum totam
        voluptatem voluptate veritatis! Dolor vitae rerum expedita ipsum minus
        doloribus ipsa itaque nisi tenetur ad velit libero soluta culpa, iste
        error, temporibus quia deserunt nesciunt autem consectetur mollitia
        adipisci? Assumenda ab harum atque, quae culpa corrupti quod voluptates
        dolore officiis voluptate, iure tenetur. Suscipit quasi velit veniam
        itaque fugiat nobis pariatur quidem repellendus hic nisi repellat rerum
        ipsum, ullam corrupti quis laudantium blanditiis, dolorem sint beatae
        ea. Veritatis, rerum. Tenetur blanditiis rem provident labore
        dignissimos sint laboriosam. Alias, facilis dolor quos a aliquid qui
        laudantium ea exercitationem sint labore, fugit, expedita libero.
        Voluptates, architecto obcaecati ipsa saepe asperiores expedita tempora
        qui, dolor distinctio suscipit ducimus alias eveniet sapiente maiores
        eaque iusto perspiciatis tenetur delectus velit? Eligendi iste iusto
        deleniti architecto tempore laboriosam impedit minima voluptates harum,
        sit earum atque eum hic doloremque animi, ut eaque ad libero quis ex
        adipisci! Modi, voluptatibus ut. Eaque neque incidunt consequatur
        suscipit possimus vero ex perferendis. Unde dignissimos, animi optio
        minus, minima repudiandae eligendi molestiae veritatis dicta autem
        expedita nostrum, reiciendis illum placeat rem. Inventore ut veritatis
        eos quia aliquam laboriosam expedita, numquam quos voluptas vel quasi
        dolorem voluptatem! Est ratione atque nihil, praesentium quaerat
        obcaecati placeat ipsum earum deserunt omnis at soluta dolores
        consectetur ab iure cupiditate officia, et id corporis doloribus aliquid
        facilis saepe voluptate! Saepe, sed quaerat! Consectetur quis vero
        blanditiis nulla similique consequuntur commodi eos id, natus suscipit
        amet repudiandae eveniet non sit autem libero quaerat cupiditate omnis,
        odio esse accusamus sed, et modi provident. Quia repudiandae saepe
        aperiam nostrum voluptates. Itaque, in aut? Incidunt voluptate totam
        nesciunt molestias ipsum consectetur deserunt tempore accusantium minus.
        Ad minima architecto vitae eveniet velit non!
      </p>
    </>
  );
};

export default AddQuestionPage;
